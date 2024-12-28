import axios from "axios"
import { useEffect, useState } from "react";

interface Item {
    id: string;
    title: string;
    url: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

const Upload = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [link, setlink] = useState<string>("");
    const [title, settitle] = useState<string>("");
    const [description, setdescription] = useState<string>("");

    async function uploadLink() {
        try {
            await axios.post('http://localhost:3000/api/link', {
                title: title,
                url: link,
                description: description
            });

        } catch (error) {
            console.error(error);
        }
    }

    async function getlinks() {
        try {
            const response = await axios.get<Item[]>('http://localhost:3000/api/link');
            setItems(response.data);
        } catch (error) {
            console.error(error, `Failed to fetch links.`);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getlinks();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
      }

      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Link
              </h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                uploadLink();
              }} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Link URL</label>
                    <input
                      type="text"
                      placeholder="Enter a link"
                      value={link}
                      onChange={(e) => setlink(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      placeholder="Enter a title"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    placeholder="Enter a description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Add Link
                </button>
              </form>
            </div>
    
            {/* Links List Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Saved Links
              </h1>
              
              {items.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all p-4 hover:shadow-md">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm mb-3 block truncate"
                      >
                        {item.url}
                      </a>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Created: {new Date(item.createdAt).toLocaleString()}
                        </p>
                        <p className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Updated: {new Date(item.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <p className="text-gray-500">No links found. Add your first link above!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}

export default Upload
