<template>
    <div class="slds-progress-bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} role="progressbar">
        <span class="slds-progress-bar__value" style='${progressBarStyle}'>
            <span class="slds-assistive-text">Progress: {progress}%</span>
        </span>
    </div>
    <div class="question-label">00:{remainingTime}</div>

    <div class="question-label">{question.label}</div>
    <div class="answers">
        <div class="answer">
            <button onclick={handleAnswerClick} data-answer="A">
                <div class="letter">A</div>
                <div class="label">{question.answerA}</div>
            </button>
        </div>
        <div class="answer">
            <button onclick={handleAnswerClick} data-answer="B">
                <div class="letter">B</div>
                <div class="label">{question.answerB}</div>
            </button>
        </div>
        <div class="answer">
            <button onclick={handleAnswerClick} data-answer="C">
                <div class="letter">C</div>
                <div class="label">{question.answerC}</div>
            </button>
        </div>
        <div class="answer">
            <button onclick={handleAnswerClick} data-answer="D">
                <div class="letter">D</div>
                <div class="label">{question.answerD}</div>
            </button>
        </div>
    </div>
</template>
