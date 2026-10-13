/**
 * @file 组织结构全景
 * @description 对齐 UI：左竖线 + 根级分隔 + 可展开树 + 分组切图图标。
 * 数据来自 getPersonnelStructure；兼容 Fastjson $ref 回参。
 */
import { useEffect, useState } from 'react'
import Panel from '../../../../../components/common/Panel'
import { GET_PERSONNEL_STRUCTURE } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

/** 每级缩进（对齐设计稿：二级约 32px、成员再缩一级） */
const INDENT = 24

/**
 * 解析 Fastjson 风格 `$ref`（如 `$.data[0].personnelSubeDTOList[0].unitInfoTypeDTOList[0]`）
 * @param {object} root 完整接口回参 `{ code, data }`
 */
function resolveJsonRefs(root) {
  const getByPath = (path) => {
    if (!path || path === '$') return root
    const tokens = String(path)
      .replace(/^\$/, '')
      .replace(/\[(\d+)\]/g, '.$1')
      .split('.')
      .filter(Boolean)
      .map((token) => (/^\d+$/.test(token) ? Number(token) : token))

    let current = root
    for (const token of tokens) {
      if (current == null) return undefined
      current = current[token]
    }
    return current
  }

  const walk = (node, seen = new Set()) => {
    if (node == null || typeof node !== 'object') return node
    if (Object.prototype.hasOwnProperty.call(node, '$ref')) {
      return walk(getByPath(node.$ref), seen)
    }
    if (seen.has(node)) return node
    seen.add(node)

    if (Array.isArray(node)) {
      return node.map((item) => walk(item, seen))
    }

    const result = {}
    Object.keys(node).forEach((key) => {
      result[key] = walk(node[key], seen)
    })
    return result
  }

  return walk(root)
}

const maskPhone = (phone) => {
  const text = String(phone ?? '').trim()
  if (!text) return '--'
  if (text.length >= 7) return `${text.slice(0, 3)}****${text.slice(-4)}`
  return text
}

const pickIcon = (name = '') => {
  if (/统筹/.test(name)) return 'coordination'
  if (/监督|巡查/.test(name)) return 'supervise'
  if (/医疗/.test(name)) return 'medical'
  return 'folder'
}

const mapMembers = (list) => {
  const rows = Array.isArray(list) ? list : []
  return rows
    .filter((item) => item && typeof item === 'object' && item.name)
    .map((item) => ({
      name: String(item.name).trim(),
      phone: maskPhone(item.count),
    }))
}

/** 接口树 → 面板树（type1 分组 / type2 小组 / unitInfoTypeDTOList 成员） */
const mapOrgTree = (data) => {
  const groups = Array.isArray(data) ? data : []

  return groups.map((group, groupIndex) => {
    const children = (Array.isArray(group?.personnelSubeDTOList) ? group.personnelSubeDTOList : []).map(
      (sub, subIndex) => {
        const members = mapMembers(sub?.unitInfoTypeDTOList)
        return {
          id: `g${groupIndex}-s${subIndex}`,
          name: String(sub?.name ?? '').trim() || `小组${subIndex + 1}`,
          count: members.length,
          icon: pickIcon(sub?.name),
          defaultExpanded: groupIndex === 0 && subIndex === 0,
          members,
        }
      },
    )

    const count = children.reduce((sum, child) => sum + child.count, 0)
    const name = String(group?.name ?? '').trim() || `分组${groupIndex + 1}`

    return {
      id: `g${groupIndex}`,
      name,
      count,
      icon: pickIcon(name),
      defaultExpanded: true,
      children,
    }
  })
}

function collectDefaultExpanded(nodes) {
  const expanded = {}
  const walk = (list) => {
    list.forEach((node) => {
      if (node.defaultExpanded) expanded[node.id] = true
      if (node.children?.length) walk(node.children)
    })
  }
  walk(nodes)
  return expanded
}

function OrgTreeNode({ node, depth, expanded, onToggle, isRoot }) {
  const hasChildren = Boolean(node.children?.length)
  const hasMembers = Boolean(node.members?.length)
  const isExpandable = hasChildren || hasMembers
  const isExpanded = Boolean(expanded[node.id])
  const iconSrc = cockpitAssets.orgIcons[node.icon]

  const handleToggle = () => {
    if (isExpandable) onToggle(node.id)
  }

  return (
    <li className={`org-tree__item${isRoot ? ' org-tree__item--root' : ''}`}>
      <div
        className={[
          'org-tree__row',
          isExpandable ? 'org-tree__row--expandable' : '',
          depth > 0 ? 'org-tree__row--child' : 'org-tree__row--root',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ paddingLeft: `${8 + depth * INDENT}px` }}
        role={isExpandable ? 'button' : undefined}
        tabIndex={isExpandable ? 0 : undefined}
        aria-expanded={isExpandable ? isExpanded : undefined}
        onClick={isExpandable ? handleToggle : undefined}
        onKeyDown={
          isExpandable
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleToggle()
                }
              }
            : undefined
        }
      >
        <span
          className={[
            'org-tree__toggle',
            isExpandable ? '' : 'org-tree__toggle--placeholder',
            isExpanded ? 'org-tree__toggle--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        />

        {iconSrc ? (
          <img
            className={`org-tree__icon org-tree__icon--${node.icon}`}
            src={iconSrc}
            alt=""
            aria-hidden="true"
          />
        ) : null}

        <span className="org-tree__label">
          <span className="org-tree__name">{node.name}</span>
          <span className="org-tree__count">{`（${node.count}人）`}</span>
        </span>
      </div>

      {isExpanded && hasMembers ? (
        <ul className="org-tree__members">
          {node.members.map((member, index) => (
            <li
              key={`${node.id}-${member.name}-${member.phone}-${index}`}
              className="org-tree__member"
              style={{ paddingLeft: `${8 + depth * INDENT + 42}px` }}
            >
              <span className="org-tree__member-dot" aria-hidden="true" />
              <span className="org-tree__member-text">
                {`${member.name}（${member.phone}）`}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {isExpanded && hasChildren ? (
        <ul className="org-tree__children">
          {node.children.map((child) => (
            <OrgTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              isRoot={false}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

const mapPersonnelStructure = (data) => {
  const resolved = resolveJsonRefs({ data })
  return mapOrgTree(resolved?.data)
}

function OrgStructure() {
  const params = useCockpitQueryParams()

  const tree = useCockpitSWR('personnelStructure', params, GET_PERSONNEL_STRUCTURE, {
    select: mapPersonnelStructure,
    fallback: () => [
      {
        id: 'org-ph',
        name: '—',
        count: '—',
        icon: 'folder',
        children: [],
      },
    ],
  })
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    setExpanded(collectDefaultExpanded(tree))
  }, [tree])

  const handleToggle = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Panel title="组织结构全景" className="panel--plain org-structure-panel">
      <div className="org-tree">
        <ul className="org-tree__list">
          {tree.map((node) => (
            <OrgTreeNode
              key={node.id}
              node={node}
              depth={0}
              expanded={expanded}
              onToggle={handleToggle}
              isRoot
            />
          ))}
        </ul>
      </div>
    </Panel>
  )
}

export default OrgStructure
