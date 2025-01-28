function displayBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogsContainer = document.getElementById('blogsContainer');
    blogsContainer.innerHTML = ''; 

    if (blogs.length === 0) {
        blogsContainer.innerHTML = '<p>No blogs saved yet.</p>';
    } else {
        blogs.forEach((blog, index) => {
            const blogDiv = document.createElement('div');
            blogDiv.classList.add('blog');
            blogDiv.innerHTML = `
                <div class="blog-header" onclick="viewBlog(${index})">
                    <h3>${blog.title}</h3>
                    <div class="view-count">
                        <span class="eye-icon">👁️</span> <span id="viewCount-${index}">${blog.viewCount}</span>
                    </div>
                </div>
                <div id="blogContent-${index}" class="blog-content" style="display: none;">
                    <p><strong>Content:</strong> ${blog.content}</p>
                    <p><em>Posted on: ${blog.date}</em></p>
                </div>
                <hr>
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

window.onload = displayBlogs;

function storeBlogData(event) {
    event.preventDefault(); 

    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;

    if (title && content) {
        const newBlog = {
            title: title,
            content: content,
            date: new Date().toLocaleString() 
        };

        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

        blogs.push(newBlog);

        localStorage.setItem('blogs', JSON.stringify(blogs));

        document.getElementById('blogTitle').value = '';
        document.getElementById('blogContent').value = '';

        alert('Blog saved to local storage!');
        displayBlogs(); 
    } else {
        alert('Please enter both title and content.');
    }
}

function displayBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogsContainer = document.getElementById('blogsContainer');
    blogsContainer.innerHTML = '';

    if (blogs.length === 0) {
        blogsContainer.innerHTML = '<p>No blogs saved yet.</p>';
    } else {
        blogs.forEach((blog, index) => {
            const blogDiv = document.createElement('div');
            blogDiv.classList.add('blog');
            blogDiv.innerHTML = `
                <h3>${blog.title}</h3>
                <p><strong>Content:</strong> ${blog.content}</p>
                <p><em>Posted on: ${blog.date}</em></p>
                <hr>
            `;
            blogsContainer.appendChild(blogDiv);
        });
    }
}

window.onload = displayBlogs;
