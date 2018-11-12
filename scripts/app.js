var blogs;
var apiURL = "http://localhost:3000/blog";
var sortBy = require('sort-by');
const axios = require('axios');
const create = require('./templates');

function getPosts() { axios.get(apiURL) 
.then(function (result) {
    let blogs = result.data.data;
    let sortedBlogs = blogs.sort(sortBy('date'))

    populateBlog(sortedBlogs);
})
};

getPosts();

function populateBlog(arr){
    allBlogs = [];

    const appliedTemplates = arr.map(blog => create.blogTemplate(blog.id, blog.title, blog.date, blog.content)).join('\n')
    document.querySelector(".blog-body").innerHTML = appliedTemplates
    
    for (const blog of arr){
        let deleteBlogButton = document.querySelector(`[data-id="${blog.id}"]`);
        deleteBlogButton.addEventListener('click', function(){
            axios.delete(apiURL+`/${blog.id}`)
            .then(function(){
                console.log("Post Deleted")
                getPosts();
            })
        })
    }  
};


let postNewBlog= document.querySelector("#new-post");
let menuArea = document.querySelector('#menu-area');

function openNewBlogWindow () {
    menuArea.innerHTML = create.newBlogTemplate();
    let closeButton = document.querySelector('#stop-post');
    closeButton.addEventListener('click', function(){
        menuArea.classList.add('hide-menu');
    })
}

postNewBlog.addEventListener("click",function(){
    openNewBlogWindow();
    menuArea.classList.remove('hide-menu');
    let newPostName = document.querySelector('.input-fieldB');
    let newPostContent = document.querySelector('.input-fieldC');
    let submitPost = document.querySelector('#submitPost');
    submitPost.addEventListener("submit",function(event){
        event.preventDefault();
        const addNewPost = axios.post(apiURL, {
            title : newPostName.value,
            content: newPostContent.value
        })
        .then(function(){
            console.log("Success")
            getPosts();
            menuArea.classList.add('hide-menu');
        });
    });
});