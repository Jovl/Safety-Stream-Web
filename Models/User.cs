using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SafetyStream.Models
{
    public class User
    {
        //Properties for a single user
        public Guid UserId { get; set; }

        //Navigation property to relate User-Users
        public virtual ICollection<Users> Users { get;set; }

    }

    public class Users
    {
        //Navigation property to relate the set of Users with many of type User
       public virtual User User { get; set;}
    }


}