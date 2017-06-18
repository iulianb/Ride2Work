using Server.Models;
using Server.Models.Context;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace Server.Controllers
{
    public class LoginController : ApiController
    {

        // POST: api/Login/SignIn
        [Route("api/Login/SignIn")]
        [HttpPost]
        public HttpResponseMessage SignIn([FromBody]User value)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var user = db.Users.SingleOrDefault(x => x.UserName == value.UserName && x.Password == value.Password);
                    if (user == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Input fields are incorrect");
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, user);
                }
            }
            catch (Exception ex)
            {
                var errorMessage = "Exception Message: " + ex.Message;
                if (ex.InnerException != null)
                    errorMessage = errorMessage + "Inner exception: " + ex.InnerException;
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorMessage);
            }

        }

        // POST: api/Login/ForgotPassword
        [Route("api/Login/ForgotPassword")]
        [HttpPost]
        public HttpResponseMessage ForgotPassword([FromBody]User userEmail)
        {
            try
            {
                using (var db = new DataBaseContext())
                {
                    var user = db.Users.SingleOrDefault(x => x.Email == userEmail.Email);
                    if (user == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Input fields are incorrect");
                    }

                    MailMessage mail = new MailMessage()
                    {
                        From = new MailAddress("no-reply@ride2work.ro"),
                        Subject = "Password for user: " + user.UserName,
                        Body = "Parola pentru utilizatorul: " + user.UserName + " este: " + user.Password,
                        IsBodyHtml = true
                    };
                    mail.To.Add(user.Email);

                    var client = new SmtpClient()
                    {
                        Port = 25,
                        Host = "server.namebox.ro",
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential("no-reply@ride2work.ro", "jNkdkM45iyIt")
                    };

                    client.Send(mail);
                    return Request.CreateResponse(HttpStatusCode.OK, "Email sent");
                }
            }
            catch (Exception ex)
            {
                var errorMessage = "Exception Message: " + ex.Message;
                if (ex.InnerException != null)
                    errorMessage = errorMessage + "Inner exception: " + ex.InnerException;
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorMessage);
            }
        }
    }
}
