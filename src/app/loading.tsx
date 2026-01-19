import { Loading } from "@/components/ui/loading";
import { Container } from "@/components/ui";

export default function LoadingPage() {
  return (
    <Container className="flex min-h-screen items-center justify-center">
      <Loading size="lg" />
    </Container>
  );
}

