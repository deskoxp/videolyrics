/**
 * LyricFlow Pro - Effects Registry
 * En este archivo puedes definir nuevos efectos visuales para las letras.
 * Cada efecto recibe el contexto del canvas (ctx), el objeto de la línea actual, el volumen medio, etc.
 */

const EffectsRegistry = {

    pulse(ctx, { scale, avgVol }) {
        const s = scale * (1 + (avgVol / 255) * 0.4);
        ctx.scale(s, s);
    },

    glitch(ctx, { time, avgVol }) {
        const intensity = (avgVol / 255) * 12;
        const t = time * 30;

        const x = Math.sin(t * 1.3) * intensity;
        const y = Math.cos(t * 0.9) * (intensity * 0.3);

        ctx.translate(x, y);

        // micro glitch RGB ocasional
        if ((Math.floor(t) % 6) === 0) {
            ctx.globalAlpha = 0.95;
        }
    },

    flash(ctx, { time, duration }) {
        // Flash SOLO al inicio de la línea
        if (duration < 0.12) {
            const p = 1 - (duration / 0.12);
            ctx.fillStyle = `rgba(255,255,255,${p})`;
            ctx.shadowBlur = 80 * p;
            ctx.shadowColor = '#fff';
        }
    },

    neon_flicker(ctx, { time }) {
        // flicker senoidal suave
        const flicker = 0.85 + Math.sin(time * 40) * 0.15;
        ctx.globalAlpha = flicker;
        ctx.shadowBlur = 35 * flicker;
    },

    rainbow(ctx, { time }) {
        const hue = (time * 120) % 360;
        ctx.fillStyle = `hsl(${hue},100%,70%)`;
        ctx.shadowColor = `hsl(${hue},100%,55%)`;
        ctx.shadowBlur = 24;
    },

    shake(ctx, { avgVol }) {
        const i = (avgVol / 255) * 8;
        ctx.translate(
            (Math.random() - 0.5) * i,
            (Math.random() - 0.5) * i
        );
    },

    floating(ctx, { time }) {
        ctx.translate(0, Math.sin(time * 2) * 12);
    },

    // 🔥 nuevos efectos optimizados

    glow_pulse(ctx, { time }) {
        const p = (Math.sin(time * 3) + 1) / 2;
        ctx.shadowBlur = 20 + p * 30;
        ctx.globalAlpha = 0.8 + p * 0.2;
    },

    wave(ctx, { time }) {
        ctx.translate(Math.sin(time * 6) * 10, 0);
    },

    chroma(ctx, { time }) {
        const o = Math.sin(time * 20) * 3;
        ctx.translate(o, 0);
    }
};

window.EffectsRegistry = EffectsRegistry;
