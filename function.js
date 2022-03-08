
function showReplyBox(replyTo, currentUserImg, id) {
    const commentContainer = document.getElementById(id);
    const hiddenBox = document.getElementById('hiddenbox');

    if(hiddenBox) {
        hiddenBox.parentNode.removeChild(hiddenBox);
    }

    commentContainer.insertAdjacentHTML('afterend',
     `
     <div class="hiddenbox" id="hiddenbox">
        <img src= "${currentUserImg}" alt="">
        <textarea class = "textcomm">@${replyTo}</textarea>
        <input type="submit"value="REPLY" class="submit">
    </div>

    `)

}

const deletebox = document.getElementById('deletebox');
function deleteComment(id){

    deletebox.style.display = "flex";
    deletebox.innerHTML =    `<div class="delete-comment">
                                <h3>Delete Comment</h3>
                                <p>Are your sure you want to delete this comment?
                                this will remove the comment and can't be undone.
                                </p>
                                <div class="delete-options">
                                <button id="no" onclick="No()">no, cancel</button>
                                <button id="yes" onclick="Yes('${id}')">yes,delete</button>
                                </div>
                            </div>
    `;
}

function No(){
    deletebox.style.display = "none";
}
function Yes(id) {
    const comment = document.getElementById(id);
    comment.parentNode.removeChild(comment);
    deletebox.style.display = "none";
}



function editComment(id) {
    // const p = document.getElementById(`pcom${id}`);
    const p = document.querySelector(`#pcom${id} p`);
    const textarea = document.getElementById(`editbox${id}`);
    const updateBtn = document.getElementById(`up${id}`);

    textarea.value = p.innerText;

    p.style.display = "none";
    updateBtn.style.display =  "flex";
    textarea.style.display = "flex";

    const allBtns = document.querySelectorAll(`#com${id} .button-wrapper`);
    allBtns.forEach(element => {
        element.style.display = "none";
    })
};

function updateComment(id) {
    const textarea = document.getElementById(`editbox${id}`);
    // const p = document.getElementById(`pcom${id} p`);
    const p = document.querySelector(`#pcom${id} p`);
    const updateBtn = document.getElementById(`up${id}`);

    p.textContent = textarea.value;

    p.style.display = "block";
    updateBtn.style.display = "none";
    textarea.style.display = "none";

    const allBtns = document.querySelectorAll(`#com${id} .button-wrapper`);
    allBtns.forEach(element => {
        element.style.display = "flex";
    })
 };


 const form = document.querySelector('.submit');
 const inputText = document.getElementById('comment-box');
 const replyList = document.getElementById('reply-list');
 const deleteBtn = document.querySelector('.trash');
 console.log(deleteBtn);


 form.addEventListener('click', (e) => {
     e.preventDefault();

     const task = inputText.value;
    if(!task) {
        alert('please input some value');
        return
    }

    replyList.insertAdjacentHTML('beforeend', 
    `
    <div class="comment-wrapper" id="one">
        <div class="profile-wrapper">
         <div class="profile-img">
           <img src="images/avatars/image-juliusomo.png" alt="">
         </div>
         <h1 class="name">juliusomo</h1>
        
         <p class="post-time">1 Week ago</p>
        </div>
        <div class="comment-paragraph">
          <p>
           <span class="user-name">@maxblagun</span> ${task}
          </p>
        </div>
        <div class="footer-comment-section">
         <div class="counter-wrapper">
           <i class="fas fa-plus"></i>
           <span class="upvote"></span>
           <i class="fas fa-minus"></i>
         </div>
         <div class="button-wrapper">

           <div class="trash-button">
             <i class="fas fa-trash"></i>
             <span class="trash" onclick="deleteThis()">Delete</span>
            </div>
            <div class="edit-button">
              <i class="fas fa-edit"></i>
              <span class="edit">Edit</span>
            </div>

          </div>
       </div>
      </div>

    `);

    

    
 });

 function deleteThis (){
     this.document.querySelector('#one').remove();
 }