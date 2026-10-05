/**
 * Simple, deterministic learning rule used by the demo:
 * a card is completed after two consecutive correct answers.
 */
export function applyAnswer(card, isCorrect) {
    const updatedCard = {
        ...card,
        totalAnswers: (card.totalAnswers || 0) + 1,
        lastReviewedAt: new Date().toISOString()
    };

    if (isCorrect) {
        updatedCard.correctStreak = (card.correctStreak || 0) + 1;
        updatedCard.correctAnswers = (card.correctAnswers || 0) + 1;
        updatedCard.isActive = updatedCard.correctStreak < 2;
    } else {
        updatedCard.correctStreak = 0;
        updatedCard.wrongAnswers = (card.wrongAnswers || 0) + 1;
        updatedCard.isActive = true;
    }

    return updatedCard;
}

export function getDeckSummary(cards) {
    const total = cards.length;
    const finished = cards.filter((card) => card.isActive === false).length;
    const answers = cards.reduce((sum, card) => sum + (card.totalAnswers || 0), 0);
    const correct = cards.reduce((sum, card) => sum + (card.correctAnswers || 0), 0);

    return {
        total,
        active: total - finished,
        finished,
        answers,
        correct,
        percentage: total === 0 ? 0 : Math.round((finished / total) * 100)
    };
}
