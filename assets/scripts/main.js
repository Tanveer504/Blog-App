class Blog {
    constructor() {
        this.array = [];
        fetch('https://jsonplaceholder.typicode.com/posts')

            .then((res) => { // success response
                console.log(res);
                return res.json();
            })
            .then((data) => { 
                this.array = data.reverse();
                this.generatePosts(this.array);
            })
            .catch((err) => {  //error response
                console.log(err);
            })
            .finally(() => {
                console.log("Success"); 
            })
    };

    generatePosts(blogPosts) {
        let blogList = blogPosts.map((post) => {
            return ` <div class="postSection">
                        <span>#'${post.id}'</span>
                        <h3>'${post.title}' </h3>
                        <p>'${post.body}'</p>
                    </div>`;
        });
        document.getElementById('blogPostsWrapper').innerHTML = blogList;
    }

    loadPosts() {

        fetch('https://jsonplaceholder.typicode.com/posts', {

            method: "POST",

            body: JSON.stringify({
                title: document.getElementById('postTitle').value,
                body: document.getElementById('postContent').value,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then((res) => { // success response
                console.log(res);
                return res.json();
            })
            .then((data) => { 
                console.log(data);
                this.array.unshift(data);
                this.generatePosts(this.array);
                
            })
            .catch((err) => {  //error response
                console.log(err);
            })
            .finally(() => {
                console.log("Success"); 
            })

    }
}
let postObj = new Blog();

document.getElementById('blogForm').addEventListener('submit', (event) => {
    event.preventDefault();
    postObj.loadPosts();
});