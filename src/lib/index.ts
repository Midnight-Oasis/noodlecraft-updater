import { SimpleGit } from 'simple-git';
import path from 'path';
import fs, { stat } from 'fs';

export const getDirAsArray = (baseDir: string) => {
  return baseDir.split(path.sep).filter((p) => p !== '');
};

export const goUpDir = (baseDir: string, levels: number = 1) => {
  const pathParts = getDirAsArray(baseDir);
  return [...pathParts].slice(0, pathParts.length - levels).join(path.sep);
};

export const findModFolder = (maxDepth: number = 4) => {
  let baseDir = path.resolve();

  for (let i = 0; i < maxDepth; i++) {
    const currentDir = goUpDir(baseDir, i);
    const modFolder = path.join(currentDir, 'mods');
    if (fs.existsSync(modFolder)) {
      console.log({ modFolder });
      return modFolder;
    }
  }

  console.log('no mod folder found');
  return null;
};

export const updateModFolder = async (git: SimpleGit) => {
  console.log('updating mod folder...')
  try {
    const response = await git.pull();
    console.log(response);
    return response;
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
};

export const checkForUpdates = async (git: SimpleGit): Promise<boolean> => {
  await git.fetch();
  const status = await git.status();
  return status.behind > 0;
};


export const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve(null)
  }))
}