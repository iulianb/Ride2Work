using Server.Models;
using Server.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    public class CommentsController : ApiController
    {
        // GET: api/Comments
        public IEnumerable<Comment> Get()
        {
            using (var db = new DataBaseContext())
            {
                db.Configuration.LazyLoadingEnabled = false;
                return db.Comments.ToList();
            }
        }

        // GET: api/Comments/5
        public HttpResponseMessage Get(int id)
        {
            using (var db = new DataBaseContext())
            {
                db.Configuration.LazyLoadingEnabled = false;
                var comment = db.Comments.SingleOrDefault(x => x.Id == id);
                if (comment != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, comment);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Comment with id = " + id + " not found");
                }
            }
        }

        // POST: api/Comments
        public HttpResponseMessage Post([FromBody]Comment value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.Comments.Add(value);
                    db.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.Created, value);
                    message.Headers.Location = new Uri(Request.RequestUri + value.Id.ToString());
                    return message;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT: api/Comments/5
        public HttpResponseMessage Put(int id, [FromBody]Comment value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    var comment = db.Comments.SingleOrDefault(x => x.Id == id);
                    if (comment == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Comment with id = " + id + " not found");
                    }
                    comment.Content = value.Content;
                    comment.CommentDate = value.CommentDate;
                    comment.Name = value.Name;
                    comment.ArticleID = value.ArticleID;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, comment);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Comments/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    var commentToBeDeleted = db.Comments.SingleOrDefault(x => x.Id == id);
                    if (commentToBeDeleted == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Comment with id = " + id + " not found");
                    }
                    db.Comments.Remove(commentToBeDeleted);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
