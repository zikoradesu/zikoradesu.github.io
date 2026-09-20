const defaultCharacters = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョー';

export function createTextCycle(values, options = {}) {
  const {
    intervalMs = 2600,
    characters = defaultCharacters,
  } = options;

  let index = 0;
  let currentValue = values[0] ?? '';

  function scrambleText(targetText, updateCallback) {
    const queue = [];
    const oldText = currentValue;
    const length = Math.max(oldText.length, targetText.length);

    return new Promise((resolve) => {
      for (let i = 0; i < length; i += 1) {
        const from = oldText[i] || '';
        const to = targetText[i] || '';
        const start = Math.floor(Math.random() * 50);
        const end = start + Math.floor(Math.random() * 60) + 10;
        queue.push({ from, to, start, end, char: '' });
      }

      let frame = 0;

      const update = () => {
        let output = '';
        let complete = 0;

        for (let i = 0, n = queue.length; i < n; i += 1) {
          let { from, to, start, end, char } = queue[i];

          if (frame >= end) {
            complete += 1;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.12) {
              queue[i].char = characters[Math.floor(Math.random() * characters.length)];
            }
            output += queue[i].char;
          } else {
            output += from;
          }
        }

        updateCallback(output);

        if (complete === queue.length) {
          currentValue = targetText;
          updateCallback(currentValue);
          resolve();
        } else {
          requestAnimationFrame(update);
          frame += 1;
        }
      };

      update();
    });
  }

  function start(updateCallback) {
    const tick = async () => {
      index = (index + 1) % values.length;
      await scrambleText(values[index], updateCallback);
      setTimeout(tick, intervalMs);
    };

    updateCallback(currentValue);
    const id = setTimeout(tick, intervalMs);

    return () => clearTimeout(id);
  }

  return {
    start,
    scrambleText,
    getValue: () => currentValue,
    update: (nextValue) => {
      currentValue = nextValue;
    },
  };
}
