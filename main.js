lwx = 0;
lwy= 0;
rwx = 0;
rwy = 0;
song = "";
lw_score = "";
rw_score = "";

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(510, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses);
}

function gotPoses(results)
{
    if (results.length > 0)
    {
       console.log(results);
       lwx = results[0].pose.leftWrist.x;
       lwy = results[0].pose.leftWrist.y;
       rwx = results[0].pose.rightWrist.x;
       rwy = results[0].pose.rightWrist.y;
       console.log("Left wrist x: "+lwx+" Left wrist y: "+lwy+" Right wrist x: "+rwx+" Right wrist y: "+rwy);
       lw_score = results[0].pose.keypoints[9].score;
       rw_score = results[0].pose.keypoints[10].score;
    }
}

function draw()
{
    image(video, 0, 0, 510, 500);

    if (lw_score > 0.2)
    {
    fill("red");
    stroke("red");
    circle(lwx, lwy, 20);
    num_lwy = Number(lwy);
    whole_lwy = floor(num_lwy);
    console.log(whole_lwy);
    vol = whole_lwy/460;
    song.setVolume(vol);
    document.getElementById("volume").innerHTML = vol.toFixed(2);
    }

    if (rw_score > 0.2)
    {
        fill("blue");
        stroke("blue");
        circle(rwx, rwy, 20);

        if (rwy > 0 && rwy <= 100)
        {
            document.getElementById("speed").innerHTML = "0.5x";
            song.rate(0.5);
        } else if (rwy > 100 && rwy <= 200)
        {
            document.getElementById("speed").innerHTML = "1x";
            song.rate(1);
        } else if (rwy > 200 && rwy <= 300)
        {
            document.getElementById("speed").innerHTML = "1.5x";
            song.rate(1.5);
        } else if (rwy > 300 && rwy <= 400)
        {
            document.getElementById("speed").innerHTML = "2x";
            song.rate(2);
        } else if (rwy > 400 && rwy <= 500)
        {
            document.getElementById("speed").innerHTML = "2.5x";
            song.rate(2.5);
        }
    }
}

function play1()
{
    song.setVolume(0.5);
    song.rate(1);
    song.play();
}

function modelLoaded()
{
    console.log("Model is loaded")
}