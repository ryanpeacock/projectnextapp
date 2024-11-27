import BackButton from "@/app/_components/BackButton";
import UsersForm from "@/app/_components/UsersForm";

const EditUserPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  return (
    <div>
      <BackButton />
      <UsersForm editUser={id} />
    </div>
  );
};

export default EditUserPage;
