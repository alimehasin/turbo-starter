import logixlysia from "logixlysia";

export const logger = logixlysia({
  config: {
    ip: true,
    useColors: false,
    showStartupMessage: true,
    startupMessageFormat: "simple",
    timestamp: { translateTime: "yyyy-mm-dd HH:MM:ss" },
    customLogFormat:
      "{now} {level} {duration} {method} {pathname} {status} {message} {ip}",
  },
});
