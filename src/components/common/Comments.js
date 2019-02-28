// import React from 'react'
// import moment from 'moment'
//
// import Auth from '../../lib/Auth'
// import {Link} from 'react-router-dom'
//
// const Comments = ({contentInput, comments, handleCommentDelete, handleCommentChange, handleCommentSubmit  }) => {
//   return (
//     <div className="comments">
//       <h2
//         className="title is-title-light is-4">
//           Comments ({comments.length})
//       </h2>
//       {comments.map((comment, index) => {
//         return (
//           <div className="columns comment" key={index}>
//             <div className="column is-2">
//               <Link to={`/user/${comment.user._id}`}>
//                 <img className="comment-image"
//                   src={comment.user.image}
//                   alt={comment.name}
//                 />
//               </Link>
//             </div>
//             <div className="column is-8">
//               <div>
//                 <p> <Link
//                   to={`/user/${comment.user._id}`}><strong
//                     className="is-primary">{comment.user.username}</strong>
//                 </Link>
//                 </p>
//                 <p>{comment.content}</p>
//               </div>
//             </div>
//             <div className="column">
//               {Auth.canEdit(comment.user._id) && Auth.isAuthenticated() && (
//                 <button
//                   className="button is-small is-delete-button delete-box"
//                   value={comment._id}
//                   onClick={handleCommentDelete}>
//                   <i className="fas fa-trash-alt"></i>
//                 </button>
//               )}
//               <p className="delete-box is-size-7">
//                 {moment(comment.createdAt).format('DD/MM/YYYY')}
//               </p>
//             </div>
//             <hr/>
//           </div>
//         )
//       })}
//       {!Auth.isAuthenticated() && (
//         <h6 className="title is-6"> <Link to="/login">Login </Link> to leave your comments</h6>
//       )}
//       {Auth.isAuthenticated() && (
//         <form onSubmit={handleCommentSubmit}>
//           <textarea
//             className="textarea"
//             placeholder="Add your comments!"
//             value={contentInput}
//             onChange={handleCommentChange}
//             maxLength="250"
//             rows="6">
//           </textarea>
//           <button className="button is-dark is-rounded"> Add Commment </button>
//         </form>
//       )}
//     </div>
//   )
// }
//
// export default Comments
