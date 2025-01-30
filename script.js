
function displayBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogsContainer = document.getElementById('blogsContainer');
    blogsContainer.innerHTML = '';

    if (blogs.length === 0) {
        blogsContainer.innerHTML = '<p class="text-gray-400">No blogs saved yet.</p>';
    } else {
        blogs.forEach((blog, index) => {
            const blogDiv = document.createElement('div');
            blogDiv.classList.add('blog', 'bg-white', 'p-6', 'rounded-lg', 'shadow-md', 'transition', 'hover:shadow-lg');
            blogDiv.innerHTML = `
                <div class="blog-header" onclick="viewBlog(${index})">
                    <h3 class="text-xl font-bold text-gray-800">${blog.title}</h3>
                    <div class="view-count text-gray-500">
                        <span class="eye-icon"><i class="fas fa-eye"></i></span> <span id="viewCount-${index}">${blog.viewCount}</span>
                    </div>
                </div>
                <div id="blogContent-${index}" class="blog-content mt-4" style="display: none;">
                    <p><strong>Content:</strong> ${blog.content}</p>
                    <p class="text-sm text-gray-500"><em>Posted on: ${blog.date}</em></p>
                    <div class="mt-3">
                        <button onclick="editBlog(${index})" class="edit-button"><i class="fas fa-edit"></i> Edit Blog</button>
                        <button onclick="deleteBlog(${index})" class="delete-button"><i class="fas fa-trash-alt"></i> Delete Blog</button>
                    </div>
                </div>
                <hr class="my-4">
            `;
            blogsContainer.appendChild(blogDiv);
        });
    }
}


function viewBlog(index) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs[index].viewCount++;

    localStorage.setItem('blogs', JSON.stringify(blogs));

    const blogContent = document.getElementById(`blogContent-${index}`);
    const currentDisplay = blogContent.style.display;
    blogContent.style.display = currentDisplay === 'none' ? 'block' : 'none';

    document.getElementById(`viewCount-${index}`).textContent = blogs[index].viewCount;
}


function editBlog(index) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs[index];

    
    document.getElementById('blogTitle').value = blog.title;
    document.getElementById('blogContent').value = blog.content;

    document.getElementById('editIndex').value = index;
}

function deleteBlog(index) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    
    
    blogs.splice(index, 1);

    
    localStorage.setItem('blogs', JSON.stringify(blogs));

    alert('Blog deleted successfully!');
    displayBlogs();
}


function storeBlogData(event) {
    event.preventDefault(); 

    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    const editIndex = document.getElementById('editIndex').value; 

    if (title && content) {
        const newBlog = {
            title: title,
            content: content,
            date: new Date().toLocaleString(),
            viewCount: 0
        };

        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

        if (editIndex !== '') {
            blogs[editIndex] = newBlog;
        } else {
            blogs.push(newBlog);
        }

        localStorage.setItem('blogs', JSON.stringify(blogs));

        document.getElementById('blogTitle').value = '';
        document.getElementById('blogContent').value = '';
        document.getElementById('editIndex').value = ''; 

        alert('Blog saved to local storage!');
        displayBlogs();
    } else {
        alert('Please enter both title and content.');
    }
}

window.onload = displayBlogs;
