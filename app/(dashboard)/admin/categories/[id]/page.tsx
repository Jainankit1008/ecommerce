"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCategoryName } from "../../../../../utils/categoryFormating";
import { convertCategoryNameToURLFriendly } from "../../../../../utils/categoryFormating";
import Link from "next/link";

interface DashboardSingleCategoryProps {
  params: { id: string };
}

const DashboardSingleCategory: React.FC<DashboardSingleCategoryProps> = ({
  params: { id },
}) => {
  const [categoryInput, setCategoryInput] = useState<{ name: string }>({
    name: "",
  });
  const router = useRouter();

  const deleteCategory = async (e: React.MouseEvent) => {
    e.preventDefault();
    const requestOptions = {
      method: "DELETE",
    };
    try {
      const response = await fetch(`http://localhost:3001/api/categories/${id}`, requestOptions);
      if (response.status === 204) {
        toast.success("Category deleted successfully");
        router.push("/admin/categories");
      } else {
        throw new Error("There was an error deleting a category");
      }
    } catch (error) {
      toast.error("There was an error deleting category");
    }
  };

  const updateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryInput.name.length > 0) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: convertCategoryNameToURLFriendly(categoryInput.name),
        }),
      };
      try {
        const response = await fetch(`http://localhost:3001/api/categories/${id}`, requestOptions);
        if (response.status === 200) {
          const data = await response.json();
          toast.success("Category successfully updated");
        } else {
          throw new Error("Error updating a category");
        }
      } catch (error) {
        toast.error("There was an error while updating a category");
      }
    } else {
      toast.error("For updating a category you must enter all values");
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/categories/${id}`);
        const data = await response.json();
        setCategoryInput({
          name: data?.name || "",
        });
      } catch (error) {
        toast.error("Error fetching category");
      }
    };
    fetchCategory();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="section-title">Edit Category</h1>
        
        <form onSubmit={updateCategory} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formatCategoryName(categoryInput.name)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCategoryInput({ ...categoryInput, name: e.target.value })
              }
              className="input-field"
              placeholder="Enter category name"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/categories"
              className="px-4 py-2 text-gray-600 hover:text-gray-800 
              font-medium rounded-lg transition-colors duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardSingleCategory;
