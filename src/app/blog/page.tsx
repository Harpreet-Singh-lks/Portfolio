'use client'

import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
}

const Blog = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: ''
  });

  // Load blogs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blogs');
    if (saved) {
      setBlogs(JSON.parse(saved));
    }
  }, []);

  // Save blogs to localStorage
  const saveBlogs = (updatedBlogs: BlogPost[]) => {
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({ title: '', excerpt: '', content: '' });
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setIsEditing(true);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content
    });
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    if (isCreating) {
      const newBlog: BlogPost = {
        id: Date.now().toString(),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      saveBlogs([newBlog, ...blogs]);
      setIsCreating(false);
    } else if (editingId) {
      const updated = blogs.map(blog =>
        blog.id === editingId
          ? { ...blog, title: formData.title, excerpt: formData.excerpt, content: formData.content }
          : blog
      );
      saveBlogs(updated);
      setEditingId(null);
      setIsEditing(false);
    }

    setFormData({ title: '', excerpt: '', content: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      saveBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditingId(null);
    setFormData({ title: '', excerpt: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Page Content */}
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-400">/Blog</h1>
          {!isEditing && !isCreating && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          )}
        </div>

        {/* Create/Edit Form */}
        {(isEditing || isCreating) && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isCreating ? 'Create New Blog Post' : 'Edit Blog Post'}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Blog post title..."
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short summary of the post..."
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  rows={10}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition font-['JetBrains_Mono'] text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <Save className="w-4 h-4" />
                  Save Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts List */}
        <div className="grid gap-6">
          {blogs.length === 0 && !isEditing && !isCreating ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">No blog posts yet</p>
              <button
                onClick={handleCreate}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-200"
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-orange-500/30 rounded-xl p-6 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2 hover:text-orange-400 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-gray-400">{blog.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 bg-neutral-800 hover:bg-orange-500/20 text-orange-400 rounded-lg transition-all duration-200"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 bg-neutral-800 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {blog.excerpt && (
                  <p className="text-gray-300 mb-4 italic">{blog.excerpt}</p>
                )}

                {blog.content && (
                  <div className="text-gray-400 whitespace-pre-wrap text-sm leading-relaxed max-h-40 overflow-hidden">
                    {blog.content}
                    {blog.content.length > 200 && '...'}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
