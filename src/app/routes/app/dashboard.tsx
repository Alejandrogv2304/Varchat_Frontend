import { ContentLayout } from '@/components/layouts';

export default function DashboardPage() {
  return (
    <ContentLayout
      title="Dashboard"
      description="Este es el punto de entrada de la parte protegida de la app."
    >
      <p className="text-slate-200">
        Aqui puedes empezar a montar los primeros widgets, el feed o el resumen principal de Varchat.
      </p>
    </ContentLayout>
  );
}