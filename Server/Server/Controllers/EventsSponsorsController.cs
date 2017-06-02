using Server.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Server.Models;
using System.Web.Http;
using System.Net.Http;

namespace Server.Controllers
{
    public class EventsSponsorsController : ApiController
    {
        // GET: api/EventsSponsors
        public IEnumerable<EventSponsor> Get()
        {
            using (var db = new DataBaseContext())
            {
                return db.EventsSponsors.ToList();
            }
        }

        // GET: api/EventsSponsors/5
        public HttpResponseMessage Get(int id)
        {
            using (var db = new DataBaseContext())
            {
                var eventsponsor = db.EventsSponsors.Single(x => x.Id == id);
                if (eventsponsor != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, eventsponsor);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "EventSponsor with id = " + id + " not found");
                }
            }
        }

        // POST: api/EventsSponsors
        public HttpResponseMessage Post([FromBody]EventSponsor value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.EventsSponsors.Add(value);
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

        // PUT: api/EventsSponsors/5
        public HttpResponseMessage Put(int id, [FromBody]EventSponsor value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var eventSponsor = db.EventsSponsors.Single(x => x.Id == id);
                    if (eventSponsor == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "EventSponsor with id = " + id + " not found");
                    }
                    eventSponsor.LinkToFacebook = value.LinkToFacebook;
                    eventSponsor.Sponsor = value.Sponsor;
                    eventSponsor.Event = value.Event;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, eventSponsor);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/EventsSponsors/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var eventSponsorToBeDeleted = db.EventsSponsors.Single(x => x.Id == id);
                    if (eventSponsorToBeDeleted == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "EventSponsor with id = " + id + " not found");
                    }
                    db.EventsSponsors.Remove(eventSponsorToBeDeleted);
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
