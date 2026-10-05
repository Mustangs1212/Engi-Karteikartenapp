import { describe, expect, it } from "vitest";
import { applyAnswer, getDeckSummary } from "./learning.js";

describe("simple learning rule", () => {
    it("finishes a card after two correct answers", () => {
        const first = applyAnswer({ correctStreak: 0 }, true);
        const second = applyAnswer(first, true);

        expect(first.isActive).toBe(true);
        expect(second.isActive).toBe(false);
        expect(second.correctAnswers).toBe(2);
    });

    it("puts a wrongly answered card back into the active queue", () => {
        const card = applyAnswer({ correctStreak: 1, isActive: false }, false);

        expect(card.isActive).toBe(true);
        expect(card.correctStreak).toBe(0);
        expect(card.wrongAnswers).toBe(1);
    });

    it("calculates a deck summary", () => {
        expect(getDeckSummary([
            { isActive: false, totalAnswers: 2, correctAnswers: 2 },
            { isActive: true, totalAnswers: 1, correctAnswers: 0 }
        ])).toEqual({
            total: 2,
            active: 1,
            finished: 1,
            answers: 3,
            correct: 2,
            percentage: 50
        });
    });
});
