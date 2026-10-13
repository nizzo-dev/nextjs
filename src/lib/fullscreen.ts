type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  mozCancelFullScreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
};

export function isFullscreen() {
  const currentDocument = document as FullscreenDocument;
  return Boolean(
    currentDocument.fullscreenElement ||
      currentDocument.webkitFullscreenElement ||
      currentDocument.mozFullScreenElement ||
      currentDocument.msFullscreenElement,
  );
}

export function requestFullscreen() {
  if (isFullscreen()) return Promise.resolve();

  const element = document.documentElement as FullscreenElement;
  const request =
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen;

  if (!request) return Promise.resolve();

  try {
    return Promise.resolve(request.call(element)).catch(() => undefined);
  } catch {
    return Promise.resolve();
  }
}

export function exitFullscreen() {
  if (!isFullscreen()) return Promise.resolve();

  const currentDocument = document as FullscreenDocument;
  const exit =
    currentDocument.exitFullscreen ||
    currentDocument.webkitExitFullscreen ||
    currentDocument.mozCancelFullScreen ||
    currentDocument.msExitFullscreen;

  if (!exit) return Promise.resolve();

  try {
    return Promise.resolve(exit.call(currentDocument)).catch(() => undefined);
  } catch {
    return Promise.resolve();
  }
}
