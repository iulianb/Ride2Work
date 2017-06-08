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
                db.Configuration.LazyLoadingEnabled = false;
                return db.EventsSponsors.ToList();
            }
        }

        // GET: api/EventsSponsors/5
        public HttpResponseMessage Get(int id)
        {
            using (var db = new DataBaseContext())
            {
                db.Configuration.LazyLoadingEnabled = false;
                var eventsponsor = db.EventsSponsors.SingleOrDefault(x => x.Id == id);
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
                    var anotherLink = db.EventsSponsors.SingleOrDefault(x => x.EventID == value.EventID &&
                                                                             x.SponsorID == value.SponsorID);
                    if (anotherLink != null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "The link between event and sponsor already exists");
                    }
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
                    db.Configuration.LazyLoadingEnabled = false;
                    var eventSponsor = db.EventsSponsors.SingleOrDefault(x => x.Id == id);
                    if (eventSponsor == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "EventSponsor with id = " + id + " not found");
                    }
                    var anotherLink = db.EventsSponsors.SingleOrDefault(x => x.EventID == value.EventID && x.SponsorID == value.SponsorID && x.Id != id);
                    if (anotherLink != null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "The link between event and sponsor already exists");
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
                    db.Configuration.LazyLoadingEnabled = false;
                    var eventSponsorToBeDeleted = db.EventsSponsors.SingleOrDefault(x => x.Id == id);
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
