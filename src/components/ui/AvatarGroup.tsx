import type { Collabrator } from "../../service/types";

type AvatarGroupProps = {
  collaborators: Collabrator[];
};

export const AvatarGroup = ({ collaborators }: AvatarGroupProps) => {
  console.log(collaborators)
  return (
    <div className="flex -space-x-4">
      {collaborators.map(({ user, socketId }) => (
        <div
          key={socketId}
          className="w-10 h-10 rounded-full border-2 border-gray-900 overflow-hidden"
          title={user.userName}
        >
          <img
            src={user.picture}
            alt={user.userName}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};
