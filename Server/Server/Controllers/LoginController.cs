using Server.Models;
using Server.Models.Context;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    public class LoginController : ApiController
    {

        // POST: api/Login
        public HttpResponseMessage Post([FromBody]User value)
        {
            using (var db = new DataBaseContext())
            {
                var user = db.Users.SingleOrDefault(x => x.UserName == value.UserName && x.Password == value.Password);
                if(user == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Input fields are incorrect");
                }
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
        }
    }
}
