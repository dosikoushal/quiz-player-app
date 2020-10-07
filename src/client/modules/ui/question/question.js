import { LightningElement, api } from 'lwc';

const TIMER_INTERVAL_MS = 1000;

export default class Question extends LightningElement {
    @api question;
    isSaving;
    remainingTime;
    isSingleDigit;

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
        this.remainingTime = 20;
        this.isSingleDigit = false;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        
        this.timerId = setInterval(() => {
            this.remainingTime = this.remainingTime - 1;
            if (this.remainingTime <= 0) {
                clearInterval(this.timerId);
                this.dispatchEvent(new CustomEvent('timeout'));
            }
            if(this.remainingTime < 10) {
                this.isSingleDigit = true;
            }
        }, TIMER_INTERVAL_MS);
    }

    disconnectedCallback() {
        clearInterval(this.timerId);
    }
}
