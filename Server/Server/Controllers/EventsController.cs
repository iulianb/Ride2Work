using System.Collections.Generic;
using Server.Models;
using Server.Models.Context;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    public class EventsController : ApiController
    {
        // GET: api/Events
        public IList<Event> Get()
        {
            using (var db = new DataBaseContext())
            {
                db.Configuration.LazyLoadingEnabled = false;
                return db.Events.ToList();
            }
        }

        // GET: api/Events/5
        public HttpResponseMessage Get(int id)
        {
            using (var db = new DataBaseContext())
            {
                db.Configuration.LazyLoadingEnabled = false;
                var eventToBeReturned = db.Events.SingleOrDefault(x => x.Id == id);
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
                    var anotherEvent = db.Events.SingleOrDefault(x => x.Title == value.Title);
                    if (anotherEvent != null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "The title already exists");
                    }
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
                    db.Configuration.LazyLoadingEnabled = false;
                    var oldValue = db.Events.SingleOrDefault(x => x.Id == id);
                    if (oldValue == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Event with id = " + id + " not found");
                    }
                    var anotherEvent = db.Events.SingleOrDefault(x => x.Title == value.Title && x.Id != id);
                    if (anotherEvent != null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "The title already exists");
                    }
                    oldValue.Title = value.Title;
                    oldValue.Description = value.Description;
                    oldValue.SponsorImage = value.SponsorImage;
                    oldValue.MapImage = value.MapImage;
                    oldValue.MapImageLink = value.MapImageLink;
                    oldValue.VideoLink = value.VideoLink;
                    oldValue.EventDate = value.EventDate;
                    oldValue.IsPrevious = value.IsPrevious;
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
                    db.Configuration.LazyLoadingEnabled = false;
                    var eventToBeDeleted = db.Events.SingleOrDefault(x => x.Id == id);
                    if (eventToBeDeleted == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Event with id = " + id + " not found");
                    }
                    var eventsSponsors = db.EventsSponsors.Where(x => x.Event.Id == eventToBeDeleted.Id);
                    foreach (var item in eventsSponsors)
                    {
                        db.EventsSponsors.Remove(item);
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
