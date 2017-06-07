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
    public class ArticlesController : ApiController
    {
        // GET: api/Articles
        public IEnumerable<Article> Get()
        {
            using (var db = new DataBaseContext())
            {
                db.Configuration.LazyLoadingEnabled = false;
                return db.Articles.ToList();
            }
        }

        // GET: api/Articles/5
        public HttpResponseMessage Get(int id)
        {
            using (var db = new DataBaseContext())
            {
                db.Configuration.LazyLoadingEnabled = false;
                var article = db.Articles.SingleOrDefault(x => x.Id == id);
                if (article != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, article);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Article with id = " + id + " not found");
                }
            }
        }

        // POST: api/Articles
        public HttpResponseMessage Post([FromBody]Article value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var anotherArticle = db.Articles.SingleOrDefault(x => x.Title == value.Title);
                    if (anotherArticle != null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "The article title already exists");
                    }
                    db.Articles.Add(value);
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

        // PUT: api/Articles/5
        public HttpResponseMessage Put(int id, [FromBody]Article value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    var article = db.Articles.SingleOrDefault(x => x.Id == id);
                    if (article == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Article with id = " + id + " not found");
                    }
                    var anotherArticle = db.Articles.SingleOrDefault(x => x.Title == value.Title && x.Id != id);
                    if (anotherArticle != null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "The article title already exists");
                    }
                    article.ArticleDate = value.ArticleDate;
                    article.Content = value.Content;
                    article.ImagePath = value.ImagePath;
                    article.Title = value.Title;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, article);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Articles/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    var articleToBeDeleted = db.Articles.SingleOrDefault(x => x.Id == id);
                    if (articleToBeDeleted == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Article with id = " + id + " not found");
                    }
                    var commentsToBeDeleted = db.Comments.Where(x => x.Article.Id == articleToBeDeleted.Id).ToList();
                    foreach (var item in commentsToBeDeleted)
                    {
                        db.Comments.Remove(item);
                    }
                    db.Articles.Remove(articleToBeDeleted);
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
