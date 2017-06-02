﻿using Server.Models;
using Server.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    public class UsersController : ApiController
    {
        // GET: api/Users
        public IEnumerable<User> Get()
        {
            using (var db = new DataBaseContext())
            {
                return db.Users.ToList();
            }
        }

        // GET: api/Users/5
        public HttpResponseMessage Get(int id)
        {
            using (var db = new DataBaseContext())
            {
                var user = db.Users.Single(x => x.Id == id);
                if (user != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, user);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User with id = " + id + " not found");
                }
            }
        }

        // POST: api/Users
        public HttpResponseMessage Post([FromBody]User value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    db.Users.Add(value);
                    db.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.Created, value);
                    message.Headers.Location = new Uri(Request.RequestUri + value.Id.ToString());
                    return message;
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT: api/Users/5
        public HttpResponseMessage Put(int id, [FromBody]User value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var user = db.Users.Single(x => x.Id == id);
                    if (user == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User with id = " + id + " not found");
                    }
                    user.UserName = value.UserName;
                    user.Password = value.Password;
                    user.Role = value.Role;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, user);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Users/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var userToBeDeleted = db.Users.Single(x => x.Id == id);
                    if (userToBeDeleted == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User with id = " + id + " not found");
                    }
                    db.Users.Remove(userToBeDeleted);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
