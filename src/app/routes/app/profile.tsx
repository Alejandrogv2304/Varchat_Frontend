import { ContentLayout } from '@/components/layouts';

export default function ProfilePage() {
  return (
    <ContentLayout
      title="Profile"
      description="Ruta protegida de perfil, lista para conectar con el usuario real."
    >
      <p className="text-slate-200">
        Aqui luego puedes mostrar datos del usuario, editar nombre, avatar y configuraciones.
      </p>
    </ContentLayout>
  );
}