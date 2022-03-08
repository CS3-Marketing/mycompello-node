import 'ssh2-sftp-client';
import MyCompello from '../../src/MyCompello';

const mockConnect = jest.fn();
const mockList = jest.fn();
const mockExists = jest.fn();
const mockGet = jest.fn();
const mockFastGet = jest.fn();
const mockPut = jest.fn();
const mockFastPut = jest.fn();
const mockAppend = jest.fn();
const mockMkdir = jest.fn();
const mockRmdir = jest.fn();
const mockDelete = jest.fn();
const mockRename = jest.fn();
const mockPosixRename = jest.fn();
const mockChmod = jest.fn();
const mockUploadDir = jest.fn();
const mockDownloadDir = jest.fn();

jest.mock('ssh2-sftp-client', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    mockAttribute: 'foobar',
    connect: mockConnect,
    end: jest.fn().mockResolvedValue(true),
    list: mockList,
    exists: mockExists,
    get: mockGet,
    fastGet: mockFastGet,
    put: mockPut,
    fastPut: mockFastPut,

    append: mockAppend,
    mkdir: mockMkdir,
    rmdir: mockRmdir,
    delete: mockDelete,
    rename: mockRename,
    posixRename: mockPosixRename,
    chmod: mockChmod,
    uploadDir: mockUploadDir,
    downloadDir: mockDownloadDir,
  })),
}));

describe('MyCompello - Unit Test', () => {
  let client: MyCompello;

  beforeEach(() => {
    client = new MyCompello({
      host: 'sftp.host.com',
      port: 22,
      username: 'username',
      password: 'password',
    });
    mockConnect.mockResolvedValue(true);
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('check class constructor', () => {
    expect(client).toBeInstanceOf(MyCompello);
  });

  test('should connect successfully', async () => {
    await client.connect();
    expect(mockConnect).toHaveBeenCalledTimes(1);
  });

  test('should fail to connect', async () => {
    mockConnect.mockRejectedValue(new Error('Connection error'));
    await expect(client.connect()).rejects.toThrow('Connection error');
  });

  test('should fetch directory list', async () => {
    const expected = [
      {
        name: 'foo',
        type: 'directory',
      },
    ];
    mockList.mockResolvedValue(expected);
    await expect(client.list('/')).resolves.toEqual(expected);
  });

  test('should throw error if directory does not exist', async () => {
    mockList.mockRejectedValue(Error("Failed to list '/': ENOENT"));
    await expect(client.list('/')).rejects.toThrow("Failed to list '/': ENOENT");
  });

  test('should check if file exists', async () => {
    const expected = true;
    mockExists.mockResolvedValue(expected);
    await expect(client.exists('/foo.txt')).resolves.toEqual(expected);
  });

  test('should throw error if problem checking if file exists', async () => {
    const expected = Error('ENOENT');
    mockExists.mockRejectedValue(expected);
    await expect(client.exists('/foo.txt')).rejects.toThrowError(expected.message);
  });

  test('should get remote file', async () => {
    const expected = 'foobar';
    mockGet.mockResolvedValue(expected);
    await expect(client.get('/foo.txt')).resolves.toEqual(expected);
  });

  test('should throw error getting remote file', async () => {
    const expected = Error('ENOENT');
    mockGet.mockRejectedValue(expected);
    await expect(client.get('/foo.txt')).rejects.toEqual(expected);
  });

  test('should fastGet remote file', async () => {
    const expected = 'foobar';
    mockFastGet.mockResolvedValue(expected);
    await expect(client.fastGet('/foo.txt', '/foo.txt')).resolves.toEqual(expected);
  });

  test('should throw error fastGetting remote file', async () => {
    const expected = Error('ENOENT');
    mockFastGet.mockRejectedValue(expected);
    await expect(client.fastGet('/foo.txt', '/foo.txt')).rejects.toThrowError(expected);
  });

  test('should put remote file', async () => {
    const expected = 'foobar';
    mockPut.mockResolvedValue(expected);
    await expect(client.put('/foo.txt', '/foo.txt')).resolves.toEqual(expected);
  });

  test('should throw error putting remote file', async () => {
    const expected = Error('ENOENT');
    mockPut.mockRejectedValue(expected);
    await expect(client.put('/foo.txt', '/foo.txt')).rejects.toEqual(expected);
  });

  test('should fastPut remote file', async () => {
    const expected = 'foobar';
    mockFastPut.mockResolvedValue(expected);
    await expect(client.fastPut('/foo.txt', '/foo.txt')).resolves.toEqual(expected);
  });

  test('should throw error fastPutting remote file', async () => {
    const expected = Error('ENOENT');
    mockFastPut.mockRejectedValue(expected);
    await expect(client.fastPut('/foo.txt', '/foo.txt')).rejects.toThrowError(expected);
  });

  test('should append to file', async () => {
    const expected = 'input string';
    mockAppend.mockResolvedValue(expected);
    await expect(client.append(Buffer.from(expected), '/foo.txt')).resolves.toEqual(expected);
  });

  test('should throw error appending to file', async () => {
    const expected = Error("Failed to fetch '/foo.txt': ENOENT");
    mockAppend.mockRejectedValue(expected);
    await expect(client.append(Buffer.from('input string'), '/foo.txt')).rejects.toEqual(expected);
  });

  test('should create directory', async () => {
    const expected = 'foobar';
    mockMkdir.mockResolvedValue(expected);
    await expect(client.mkdir('/foo')).resolves.toEqual(expected);
  });

  test('should throw error creating directory', async () => {
    const expected = Error("Failed to create '/foo': ENOENT");
    mockMkdir.mockRejectedValue(expected);
    await expect(client.mkdir('/foo')).rejects.toEqual(expected);
  });

  test('should remove directory', async () => {
    const expected = 'foobar';
    mockRmdir.mockResolvedValue(expected);
    await expect(client.rmdir('/foo')).resolves.toEqual(expected);
  });

  test('should throw error removing directory', async () => {
    const expected = Error("Failed to remove '/foo': ENOENT");
    mockRmdir.mockRejectedValue(expected);
    await expect(client.rmdir('/foo')).rejects.toEqual(expected);
  });

  test('should delete file', async () => {
    const expected = 'foobar';
    mockDelete.mockResolvedValue(expected);
    await expect(client.delete('/foo.txt')).resolves.toEqual(expected);
  });

  test('should throw error deleting file', async () => {
    const expected = Error("Failed to delete '/foo.txt': ENOENT");
    mockDelete.mockRejectedValue(expected);
    await expect(client.delete('/foo.txt')).rejects.toEqual(expected);
  });

  test('should rename file', async () => {
    const expected = 'foobar';
    mockRename.mockResolvedValue(expected);
    await expect(client.rename('/foo.txt', '/bar.txt')).resolves.toEqual(expected);
  });

  test('should throw error renaming file', async () => {
    const expected = Error("Failed to rename '/foo.txt' to '/bar.txt': ENOENT");
    mockRename.mockRejectedValue(expected);
    await expect(client.rename('/foo.txt', '/bar.txt')).rejects.toEqual(expected);
  });

  test('should posixRename file', async () => {
    const expected = 'foobar';
    mockPosixRename.mockResolvedValue(expected);
    await expect(client.posixRename('/foo.txt', '/bar.txt')).resolves.toEqual(expected);
  });

  test('should throw error posixRenaming file', async () => {
    const expected = Error("Failed to rename '/foo.txt' to '/bar.txt': ENOENT");
    mockPosixRename.mockRejectedValue(expected);
    await expect(client.posixRename('/foo.txt', '/bar.txt')).rejects.toEqual(expected);
  });

  test('should chmod file', async () => {
    const expected = 'foobar';
    mockChmod.mockResolvedValue(expected);
    await expect(client.chmod('/foo.txt', '777')).resolves.toEqual(expected);
  });

  test('should throw error chmod file', async () => {
    const expected = Error("Failed to chmod '/foo.txt': ENOENT");
    mockChmod.mockRejectedValue(expected);
    await expect(client.chmod('/foo.txt', '777')).rejects.toEqual(expected);
  });

  test('should upload directory', async () => {
    const expected = 'foobar';
    mockUploadDir.mockResolvedValue(expected);
    await expect(client.uploadDir('/foo', '/foo')).resolves.toEqual(expected);
  });

  test('should throw error uploading directory', async () => {
    const expected = Error("Failed to upload '/foo': ENOENT");
    mockUploadDir.mockRejectedValue(expected);
    await expect(client.uploadDir('/foo', '/foo')).rejects.toEqual(expected);
  });

  test('should download directory', async () => {
    const expected = 'foobar';
    mockDownloadDir.mockResolvedValue(expected);
    await expect(client.downloadDir('/foo', '/foo')).resolves.toEqual(expected);
  });

  test('should throw error downloading directory', async () => {
    const expected = Error("Failed to download '/foo': ENOENT");
    mockDownloadDir.mockRejectedValue(expected);
    await expect(client.downloadDir('/foo', '/foo')).rejects.toEqual(expected);
  });
});
