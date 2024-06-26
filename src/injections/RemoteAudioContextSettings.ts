import { webpack } from "replugged";
import { PluginInjector } from "..";
import Modules from "../lib/requiredModules";

export default (): void => {
  const { RemoteAudioContextSettings } = Modules;
  const updatePendingSettings = webpack.getFunctionKeyBySource(
    RemoteAudioContextSettings,
    /.\[.\]=/,
  );
  PluginInjector.before(
    RemoteAudioContextSettings,
    updatePendingSettings,
    (args: [unknown, unknown, { volume: number }]) => {
      if (args?.[2]?.volume && args?.[2]?.volume > 200) args[2].volume = 200;
      return args;
    },
  );
};
