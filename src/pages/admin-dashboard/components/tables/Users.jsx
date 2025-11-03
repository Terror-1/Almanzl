import { useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../../slices/userSlice";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-toastify";

const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data, error, isLoading, refetch } = useGetUsersQuery({
    page,
    limit: 10,
  });
  console.log(data);

  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUserId).unwrap();
      toast.success("User deleted successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    } finally {
      setIsModalOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4">Users Management</h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">
          {error?.data?.message || "Failed to fetch users"}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Email
                  </th>

                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.users?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500 italic"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  data?.users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {index + 1 + (page - 1) * 10}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {user.email}
                      </td>

                      <td className="py-3 px-4 flex gap-2">
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                          onClick={() => handleDeleteClick(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded-md disabled:opacity-50 text-sm hover:bg-gray-100"
            >
              Prev
            </button>
            <span className="px-3 py-1 border rounded-md text-sm">
              Page {page} of {data?.pagination?.totalPages || 1}
            </span>
            <button
              disabled={page === data?.pagination?.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded-md disabled:opacity-50 text-sm hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UsersTable;
