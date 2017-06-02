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
    public class SponsorsController : ApiController
    {
        // GET: api/Sponsors
        public IEnumerable<Sponsor> Get()
        {
            using (var db = new DataBaseContext())
            {
                return db.Sponsors.ToList();
            }
        }

        // GET: api/Sponsors/5
        public HttpResponseMessage Get(int id)
        {
            using (var db = new DataBaseContext())
            {
                var sponsor = db.Sponsors.Single(x => x.Id == id);
                if (sponsor != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, sponsor);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Sponsor with id = " + id + " not found");
                }
            }
        }

        // POST: api/Sponsors
        public HttpResponseMessage Post([FromBody]Sponsor value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.Sponsors.Add(value);
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

        // PUT: api/Sponsors/5
        public HttpResponseMessage Put(int id, [FromBody]Sponsor value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var sponsor = db.Sponsors.Single(x => x.Id == id);
                    if (sponsor == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Sponsor with id = " + id + " not found");
                    }
                    sponsor.Description = value.Description;
                    sponsor.LogoLink = value.LogoLink;
                    sponsor.Name = value.Name;
                    sponsor.SiteLink = value.SiteLink;

                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, sponsor);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Sponsors/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var sponsorToBeDeleted = db.Sponsors.Single(x => x.Id == id);
                    if (sponsorToBeDeleted == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Sponsor with id = " + id + " not found");
                    }
                    db.Sponsors.Remove(sponsorToBeDeleted);
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
