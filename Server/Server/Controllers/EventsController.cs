using System.Collections.Generic;
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
    public class EventsController : ApiController
    {
        // GET: api/Events
        public IEnumerable<Event> Get()
        {
            using (var db = new DataBaseContext())
            {
                return db.Events.ToList();
            }
        }

        // GET: api/Events/5
        public HttpResponseMessage Get(int id)
        {
            using (var db = new DataBaseContext())
            {
                var eventToBeReturned = db.Events.Single(x => x.Id == id);
                if (eventToBeReturned != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, eventToBeReturned);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Event with id = " + id + " not found");
                }
            }
        }

        // POST: api/Events
        public HttpResponseMessage Post([FromBody]Event value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.Events.Add(value);
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

        // PUT: api/Events/5
        public HttpResponseMessage Put(int id, [FromBody]Event value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var oldValue = db.Events.Single(x => x.Id == id);
                    if (oldValue == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Event with id = " + id + " not found");
                    }
                    oldValue.Description = value.Description;
                    oldValue.ImagePath = value.ImagePath;
                    oldValue.EventDate = value.EventDate;
                    oldValue.Title = value.Title;
                    oldValue.VideoLink = value.VideoLink;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, oldValue);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Events/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var eventToBeDeleted = db.Events.Single(x => x.Id == id);
                    if (eventToBeDeleted == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Event with id = " + id + " not found");
                    }
                    db.Events.Remove(eventToBeDeleted);
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
