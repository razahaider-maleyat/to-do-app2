"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchRecord = async () => {
    const response = await axios.get(`http://localhost:3000/posts`);
    setPosts(response.data);
  };
  useEffect(() => {
    fetchRecord();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    const filterData = posts.filter((post) => post.id !== id);
    setPosts(filterData);
  };
  return (
    <div className="px-48 py-20">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link
          href="/posts/create"
          className="px-4 py-1.5 bg-green-500 rounded text-white"
        >
          Create New Post
        </Link>
      </div>
      <table className="divide-y divide-gray-200 w-full mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start font-medium text-gray-500 uppercase"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start font-medium text-gray-500 uppercase"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start font-medium text-gray-500 uppercase"
            >
              Content
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start font-medium text-gray-500 uppercase"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-3 text-gray-800">{post.id}</td>
              <td className="px-6 py-3 text-gray-800">{post.title}</td>
              <td className="px-6 py-3 text-gray-800">{post.content}</td>
              <td className="space-x-4 px-6 py-3 text-end">
                <Link href={`/posts/${post.id}?mode=read`}>
                  <button className="text-blue-600">Read</button>
                </Link>
                <Link href={`/posts/${post.id}?mode=edit`}>
                  <button className="text-blue-600">Edit</button>
                </Link>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
