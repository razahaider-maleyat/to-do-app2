"use client";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const { id } = useParams();
  const searchQuery = useSearchParams();
  const mode = searchQuery.get("mode");
  const [post, setPost] = useState(null);
  const [ediing, setEditing] = useState(mode === "edit");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    router.push("/");
  };

  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:3000/posts/${id}`);
    setPost(response.data);
    setTitle(response.data.title);
    setContent(response.data.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/posts/${id}`, { title, content });
    setEditing(false);
    fetchPost();
  };

  return (
    <div className="container mx-auto p-4">
      {post && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {ediing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="5"
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-700">{post.content}</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Home
        </button>
        <button
          onClick={() => setEditing(!ediing)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
