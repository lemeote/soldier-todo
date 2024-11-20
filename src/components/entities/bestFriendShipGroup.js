const findOptimalGrouping = (scores) => {
    const prefectures = Object.keys(scores);

    // Helper: Calculate group score
    const calculateGroupScore = (group) => {
      let score = 0;
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const a = group[i];
          const b = group[j];
          score += (scores[a]?.[b] || 0) + (scores[b]?.[a] || 0);
        }
      }
      return score;
    };

    // Recursive grouping function
    const findBestGroups = (remaining, currentGroups) => {
      if (currentGroups.length > 3) return null;

      if (remaining.length === 0) {
        const score = currentGroups.reduce(
          (total, group) => total + calculateGroupScore(group),
          0
        );
        return { groups: currentGroups, score };
      }

      let best = { groups: [], score: -Infinity };
      for (let i = 0; i < currentGroups.length; i++) {
        const newGroups = [...currentGroups];
        newGroups[i] = [...newGroups[i], remaining[0]];
        const result = findBestGroups(remaining.slice(1), newGroups);
        if (result && result.score > best.score) {
          best = result;
        }
      }

      const newGroup = [[remaining[0]]];
      const result = findBestGroups(remaining.slice(1), [
        ...currentGroups,
        ...newGroup,
      ]);
      if (result && result.score > best.score) {
        best = result;
      }

      return best;
    };

    const result = findBestGroups(prefectures, []);
    return result?.groups || [];
  };

export default findOptimalGrouping;
