using System;
using System.Collections.Generic;

using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SafetyStream.Models
{
    //[Table("User")]
    public class User
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //[Key]
        //Properties for a single user
        public int UserId { get; set; }
        public string FirstName { get; set; }

        //Navigation property to relate User-Users
        //public virtual ICollection<Users> Users { get;set; }

    }

    /*public class Users
    {
       [Key]
        //Navigation property to relate the set of Users with many of type User
       public virtual User User { get; set;}
    }*/


}