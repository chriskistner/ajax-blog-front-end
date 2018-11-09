var blogs;
var apiURL = "http://localhost:3000/blog";
var sortBy = require('sort-by');
const axios = require('axios');
const create = require('./templates')

axios.get(apiURL) 
.then(function (result) {
    let blogs = result.data.data;
    let sortedBlogs = blogs.sort(sortBy('date'))

    populateBlog(sortedBlogs);
});

function populateBlog(arr){
    allBlogs = [];
    for (var i = 0; i < arr.length; i++){
        let blog = arr[i];
        document.querySelector(".blog-body").innerHTML += create.blogTemplate(blog.id, blog.title, blog.date, blog.content);    
    }  
};
let postNewBlog= document.querySelector("#new-post");
let menuArea = document.querySelector('#menu-area');
console.log(menuArea);
function openNewBlogWindow () {
    menuArea.innerHTML = create.newBlogTemplate();
}
postNewBlog.addEventListener("click",function(){
    openNewBlogWindow();
    menuArea.classList.remove('hide-menu');
});