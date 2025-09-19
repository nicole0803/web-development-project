using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

// *** NOTE: We don't want to have much code logic in Controller, logic should be define in application layer ***
public class ActivitiesController : BaseAPiController
{
    // private readonly AppDbContext context;
    // public ActivitiesController(AppDbContext context)
    // {
    //     this.context = context;
    // }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // Use mediator to send request to handler in \Application\Activities\Queries\GetActivityList.cs
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        return await Mediator.Send(new GetActivityDetails.Query { Id = id });

    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command { Activity = activity });
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command { Activity = activity });
        return NoContent(); // Nothing to return
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActvity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command { Id = id });
        return Ok();
    }


}
