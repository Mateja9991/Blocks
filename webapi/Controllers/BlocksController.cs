using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlocksController : ControllerBase
    {
        public BlocksContext Context { get; set; }
        public BlocksController(BlocksContext context)
        {
            Context = context;
        }
        [Route("PreuzmiUsera/{username}")]
        [HttpGet]
        public async Task<User> PreuzmiUsera(string username)
        {
            return await Context.Users.FindAsync(username);
        }
        [Route("PreuzmiUsere")]
        [HttpGet]
        public async Task<List<User>> PreuzmiUsere()
        {
            return await Context.Users.ToListAsync();
        }
        [Route("UpisiUsera")]
        [HttpPost]
        public async Task Upisiusera([FromBody] User user)
        {
            if (!isValidUser(user))
                return;
            Context.Users.Add(user);
            await Context.SaveChangesAsync();
        }
        [Route("IzmeniUsera")]
        [HttpPut]
        public async Task IzmeniUsera([FromBody] User user)
        {
            if (user.Username == "" || user.Password == "")
            {
                this.HttpContext.Response.StatusCode = 455;
                return;
            }
            Context.Update<User>(user);
            await Context.SaveChangesAsync();
        }
        [Route("IzbrisiUsera/{username}")]
        [HttpDelete]
        public async Task IzbrisiUsera(string username)
        {
            var user = await Context.Users.FindAsync(username);
            await IzbrisiLoptu(username);
            await IzbrisSlider(username);
            Context.Remove(user);
            await Context.SaveChangesAsync();
        }
        private bool isValidUser(User user)
        {
            if (user.Username == "" || user.Password == "")
            {
                this.HttpContext.Response.StatusCode = 455;
                return false;
            }
            return true;
        }

        //
        //Lopta
        //

        [Route("PreuzmiLoptu/{username}")]
        [HttpGet]
        public async Task<Ball> PreuzmiLoptu(string username)
        {
            return await Context.Balls.FindAsync(username);
        }
        [Route("UpisiLoptu")]
        [HttpPost]
        public async Task UpisiLoptu([FromBody] Ball lopta)
        {
            Context.Balls.Add(lopta);
            await Context.SaveChangesAsync();
        }
        [Route("IzbrisiLoptu/{username}")]
        [HttpDelete]
        public async Task IzbrisiLoptu(string username)
        {
            var lopta = await Context.Balls.FindAsync(username);
            Context.Remove(lopta);
            await Context.SaveChangesAsync();
        }

        //
        //Slider
        //

        [Route("PreuzmiSlidera/{username}")]
        [HttpGet]
        public async Task<Slider> PreuzmiSlidera(string username)
        {
            return await Context.Sliders.FindAsync(username);
        }
        [Route("UpisiSlidera")]
        [HttpPost]
        public async Task UpisiSlider([FromBody] Slider slider)
        {
            Context.Sliders.Add(slider);
            await Context.SaveChangesAsync();
        }
        [Route("IzbrisiSlidera/{username}")]
        [HttpDelete]
        public async Task IzbrisSlider(string username)
        {
            var slider = await Context.Sliders.FindAsync(username);
            Context.Remove(slider);
            await Context.SaveChangesAsync();
        }

        //
        //Blokovi
        //
        /*
        [Route("PreuzmiBlockove/{username}")]
        [HttpGet]
        public async Task<List<Blok>> PreuzmiBlockove(string username)
        {
            var users = await Context.Users.ToListAsync();
            User trazen = null;
            foreach(User user in users)
            {
                if(user.Username == username)
                    trazen = user;
            }
            if(trazen != null)
            {
                var blokovi = trazen.Blocks;
                return blokovi;
            }
            return null;
        }
        */
    }
}