export const CACHE_POLICY = {

  homepage: {
    ttl: 1000 * 60 * 5, // 5 phút
  },

  courses: {
    ttl: 1000 * 60 * 10, // 10 phút
  },

  student: {
    ttl: 1000 * 60 * 1, // 1 phút
  },

  analytics: {
    ttl: 1000 * 10, // 10 giây
  },

};
