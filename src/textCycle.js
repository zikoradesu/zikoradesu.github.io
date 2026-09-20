const defaultCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョー';

export function createTextCycle(values, options = {}) {
  const {
    intervalMs = 2000,
    scrambleMs = 500,
    characters = defaultCharacters,
  } = options;

  let index = 0;
  let currentValue = values[0] ?? '';

  function scrambleText(targetText, updateCallback) {
    return new Promise((resolve) => {
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / scrambleMs, 1);
        let nextText = '';

        for (let i = 0; i < targetText.length; i += 1) {
          if (i < Math.floor(progress * targetText.length)) {
            nextText += targetText[i];
          } else {
            nextText += characters[Math.floor(Math.random() * characters.length)];
          }
        }

        updateCallback(nextText);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          updateCallback(targetText);
          resolve();
        }
      };

      requestAnimationFrame(tick);
    });
  }

  function start(updateCallback) {
    const cycle = async () => {
      index = (index + 1) % values.length;
      await scrambleText(values[index], updateCallback);
    };

    const intervalId = setInterval(cycle, intervalMs);

    return () => clearInterval(intervalId);
  }

  return {
    getValue: () => currentValue,
    update: (nextValue) => {
      currentValue = nextValue;
    },
    start,
    scrambleText,
  };
}
