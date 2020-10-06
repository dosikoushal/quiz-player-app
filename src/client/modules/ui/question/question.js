import { LightningElement, api } from 'lwc';

const TIMER_INTERVAL_MS = 20;

export default class Question extends LightningElement {
    @api question;
    @api duration = 6;
    isSaving;
    progress = 0;
    progressBarStyle = '';
    timerId;

    /* Original code
    connectedCallback() {
        this.isSaving = false;
    }
    */

    handleAnswerClick(event) {
        // Prevent duplicate answers
        if (this.isSaving) {
            return;
        }
        this.isSaving = true;
        // Send answer to parent component
        const { answer } = event.target.dataset;
        const answerEvent = new CustomEvent('answer', {
            detail: {
                answer
            }
        });
        this.dispatchEvent(answerEvent);
    }

    connectedCallback() {
        this.isSaving = false; //original code

        const durationMs = this.duration * 1000;
        let elapsedMs = 0;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.timerId = setInterval(() => {
            elapsedMs += TIMER_INTERVAL_MS;
            const progressPercent = elapsedMs / durationMs;
            this.progress = Math.floor(100 * progressPercent);
            const color = this.getColor(progressPercent);
            this.progressBarStyle = 'width: ${this.progress}%; background-color: ${color};';
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(this.timerId);
                this.dispatchEvent(new CustomEvent('timeout'));
            }
        }, TIMER_INTERVAL_MS);
    }

    getColor(percent) {
        const hue = ((1 - percent) * 120).toString(10);
        return 'hsl(${hue}, 100%, 50%)';
    }

    disconnectedCallback() {
        clearInterval(this.timerId);
    }
}
