const container = document.querySelector(".container")
const containerRect = container.getBoundingClientRect()

const goal = document.querySelector(".goal")
const goalRect = goal.getBoundingClientRect()

const start = document.querySelector(".start")
const startRect = start.getBoundingClientRect()

const X_OFFSET = containerRect.x + containerRect.width/2
const Y_OFFSET = containerRect.y + containerRect.height

let MOUSE_POSITION
let IS_STARTED = false
let IS_FINISHED = false
let GAME_OVER = false

const mouseTracking = []

// EVENT LISTENERS

const onMouseMove = e => {
    if (IS_STARTED && !GAME_OVER) {
        MOUSE_POSITION = [e.clientX-X_OFFSET, Y_OFFSET-e.clientY]
        if (!IS_FINISHED) mouseTracking.push(MOUSE_POSITION)
    }
}
document.addEventListener("mousemove", onMouseMove)

start.addEventListener("click", e => {
    IS_STARTED = true
})

goal.addEventListener("mouseover", e => {
    IS_FINISHED = true
    if (!GAME_OVER && IS_STARTED) {
        console.log(mouseTracking)
        fetch("https://psy-task-default-rtdb.europe-west1.firebasedatabase.app/data.json", {
            method: "POST",
            body: JSON.stringify({
                user: "user00",
                mouseTracking: mouseTracking
            }),
            headers: {"Content-type": "application/json"}
        })
    }

    GAME_OVER = true

})