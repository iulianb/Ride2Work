using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Password { get; set; }
        public int Role { get; set; }
    }
}