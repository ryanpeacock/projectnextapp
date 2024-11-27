import UserProfile from "../_components/UserProfile";
import BackButton from "../_components/BackButton";
import DeleteModal from "../_components/DeleteModal";

const UserPageProfile = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  return (
    <div>
      <div className="flex items-center">
        <BackButton />
        <DeleteModal id={id} />
      </div>

      <UserProfile id={id} />
    </div>
  );
};

export default UserPageProfile;
