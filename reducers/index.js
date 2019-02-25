/* state information 
UserInfo - 사용자의 개인정보
UserInsurancInfo - 사용자의 개인정보 중 현재 가입한 보험에 대한 내역
PlannerInfo - 설계사에 대한 정보 , 설계사 개인 페이지 링크도 필요할 듯?
RequestForISM - 보험금 청구내역 
InsuranceInfo - 특정 보험에 대한 데이터 
*/

const reducer = (
  state = {
    coin : 0,
    CoinInfo : [],
    testValue : null,
    hyperServer : "192.168.29.197", //"192.168.0.9", //192.168.29.197
    ChoiceInsurance: false,
    claimIndex : 8,
    Hospital : [
      
        {
          username: "혜화 아픈이 치과",
          comment: "충치치료 및 스케일링",
          start: "19.02.01",
          uri:
            "https://www.jejunuh.co.kr/data/content/download/simbol.jpg"
        },
        {
          username: "서울대 병원",
          comment: "요통 검사",
          start: "19.01.21",
          uri:
            "http://www.snuh.org/asset/img/about/img_sigCont05.jpg"
        },
        {
          username: "아산병원",
          comment: "인후두암 검사",
          start: "19.01.06",
          uri:
            "http://www.urbanbrush.net/web/wp-content/uploads/edd/2017/11/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-11-26-%EC%98%A4%EC%A0%84-11.25.44.png"
        },
        {
          username: "고려대학교 병원",
          comment: "알러지 검사, 대화파모티딘정",
          start: "19.01.02",
          uri: "https://previews.123rf.com/images/sentavio/sentavio1602/sentavio160200239/52812316-%EC%8B%AC%EC%A0%84%EB%8F%84-%EB%9D%BC%EC%9D%B8-%EB%A1%9C%EA%B3%A0-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%B2%A1%ED%84%B0-%ED%85%9C%ED%94%8C%EB%A6%BF-%EC%84%A0%ED%98%95-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%95%BD%EA%B5%AD-%ED%81%AC%EB%A1%9C%EC%8A%A4-%EC%9D%98%EB%A3%8C-%ED%81%B4%EB%A6%AC%EB%8B%89-%EA%B1%B4%EA%B0%95-%EB%B3%91%EC%9B%90-%EB%A1%9C%EA%B3%A0-%EC%9D%98%ED%95%99-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-.jpg"
        },
        {
          username: "목동병원",
          comment: "(원외) 일성오구멘틴정, 비인강경검사",
          start: "18.06.07",
          uri: "http://www.urbanbrush.net/web/wp-content/uploads/edd/2017/11/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-11-12-%EC%98%A4%ED%9B%84-3.50.14.png"
        },
        {
          username: "서울대 병원",
          comment: "시네츄라시럽, 종별행위검사",
          start: "18.03.04",
          uri:
            "http://www.snuh.org/asset/img/about/img_sigCont05.jpg"
        },
        {
        username: "혜화 아픈이 치과",
        comment: "충치치료 및 스케일링",
        start: "18.02.01",
        uri:
          "https://www.jejunuh.co.kr/data/content/download/simbol.jpg"
      },
      {
        username: "서울대 병원",
        comment: "요통 검사",
        start: "17.03.02",
        uri:
          "http://www.snuh.org/asset/img/about/img_sigCont05.jpg"
      },
      {
        username: "아산병원",
        comment: "인후두암 검사",
        start: "16.01.06",
        uri:
          "http://www.urbanbrush.net/web/wp-content/uploads/edd/2017/11/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-11-26-%EC%98%A4%EC%A0%84-11.25.44.png"
      },
      ],
    
    UserComment: [
      {
        username: "skin2nirv",
        comment: "정말 즐거운 시간이었습니다. 다음에 또 만나요.",
        start: 1,
        uri:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXFxcXFxcYGBUXFxcXFxcXFxcXFxcYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK//AABEIAOIA3wMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAQIHAAj/xABDEAABAwMBBQYCBwUHAwUAAAABAAIRAwQhMQUGEkFREyJhcYGRMqEHQlKxwdHwFCMzYoJykpOisuHxc8LSFRZDU6P/xAAaAQACAwEBAAAAAAAAAAAAAAABAgADBAUG/8QAKREAAgICAQMDBAIDAAAAAAAAAAECEQMxIRIyQQRRYRMicYFEsSMzQ//aAAwDAQACEQMRAD8A4avLy8oQyFsCt6VIQXEwB7k9B+a1a3iMBQhqSthMHOOf65o2jYHmJbEyOYGDHrjxnE4WtzUY6RTGMZIiQBnyHPyHgjRAErC34P15LVAh5eW3ksDooQ3ptmR4Z8vx5Y8FgjhMEZGCFlrvOREHpH6HsiLusHkOIh2A6NDrkCddPf1JIR0gHTMD2H61/WESyu+mYJDmxAyYI6D8jpqhKFOSG5zp+j1R/Fw4w9sCRqHDWWn5dQQepTRAwrsmvaCCWyO6Se6D0IOWzAzkIauaggFsgTOeIakYzjn+jmajTdSPEzvMcJA1GkkeY5jCnuqLajTwmMfCRERGRmR5f8h/Ao13d3rLC2lWlzDHC8/E3wdzcPE50Vx7dhHIrjXDkNPz5TCtW6W0DUPYVHGY7jjrj6pPPwRhPwyjNiXci33NrScNAltTYtM6GFtd7Oqgd1yWk3DepVplJauxD9VyV3mzazdJ90eNq1Bq1R1Nvjm0qDKxNx3DPtKQbTqkQ5Nqe26R1+a9d3FJzcQhXyPfuip3BklPN1G5HqkdyMlWXdCnp6pcfcWZewPux3wtgFm9HfCwrGZ1o54t6VMuMBYAk9E62VZAtDsfaiYxPC0E+hJ9FkirOmA17eAAASToPBO7PZ7KVMPeCXuyGCOHOhnWJgY8crFNrSHVX5E9xoA7wkAQDylb0Hmq4u6yHmJmOFsM6TpM9eiehbFd6C7DTPEQMcQaCcR4nlgnTmpH0W0WgEcTyc6GGtMfPMg+CZ0qLnvDogNENHdHmfstAHd01nWMgXDO0a+oMATwgnrAALie8e7PnxeaFEE7BJ5zr1n9Z6rDWGTzgSfKEfb0sNHwnEuzEEmPuBxOAfJCNb3g3WTkA+cidOvgkoY0AkYGefr/AMqJyZdgGvgnny1gTmPNp9vESva0kqUQyxuCt7YS8A88ep0yIg6LdrQIHUT7CfwUbTnQRHj96hDeARGRHLmTMeiK2c/k/R2jvsv5E/ymDPvyUVOnHIEljpk6a5xzET7dVPYUzxlpEGAQIEh3xCARHM+hTIDG+0KXBTHD3Z+JuDGsuHDoQYB9DokVW4zOCJj05Ea/rVWI3oqUoJgmRE4a4Awc8pDRnx6qpvIBcIxkeWf9k0xYmXu0PMa45jn+a3tqxY9rgdC0+MiEMCsquxmjpbNuS0Fzc8/PmsM21TOuEPu8+nUoN4omAD5jB/BE1Nj0zpha1o5skk2iQXNJ3RDXNhRfyCiqbB+y5LbrZVdvwk+6JFXuE1N3KZ+Ewg7nYZpgkOlQ9tcs1lZftOo5sOCXgddXuJK41Vs3OZj0KqlbmrfucO76JcWx83aEXv8AE9FhbXn8T0WIVjKUc7a0lXGuQykWMHegGcYAbz1JMgxHVVSi7LczH/P3qzMfDKz40IA8uINDYwYJPIrPj0dFkd7VY1gaPhgCREwG9OZdjM83ejDYgw+c8Ic4gQO8e7GnMuGs6EhV+hUD6zSQeBhkwSMDIg8sxCb7LqBgJOdHQSRknvQQJnOuuB4JovkVoJriA5hJMUwzTAkcjiJyDiZxqcwGgez4ODk7EEnhYD3vhMNLqkeZH2pMljVFSqXweEEEnAlrRB4o54gHUyOoR+zrunTZLuESQ8OPEM8MFrRzA4JnnwAnMJqTByhDfUS1ujpnjJ5xPCTPJxfwic4b5BA7Gs/iqkT2eWjGXZDRB1yPz5A2Z7OKm+o+e8+f/sPC2YBJOYDW6zBHODC2jal7BQpuhxBLp0EhoAnk6DA6CfBK4jdRXar3PfJMmYB1ByZjwko59oYaB4nIgEyBAIwm1js1oqB3CQAQGgzAAPeMznWfCOaM2gxrHOZwz3pgEEhkFhEZjUCSfSUFDjkDlyVv9m74JbIMQIcAeEA8JjIJiMZnzUFNg4hEENMkic506cjorRtikKfCclxJDXREGck+UctZ8kjp2vC6HCRjwJ4gyoPWCEslQ8eQaypOJdHMEfKT92vii7RkPdBIMkNIMkOgFg0zBn28UVs22HEGgau4jOkHAE9NeXP2X7SqjtyRoDTwMfDTaCB64n1URGjVlbs3uDT3XBrmmBjijIg6jiPq0JbcfE7zP3qd/eIxEjzgaAeEQtL1velK3YaB1kLC8EpCx7s0nva4NMZ+8Y+4pz2dwzxSTdW7LOPEjHyIP4K10tuUzqtUO0w5u9gI2nVbq1aneMfWaU6ZeUXcwoq9jQfyCcp4Aae3aLtfmotqXFJzMR6Karu3SPwkhK9obENMSHSg9DRq+CuVirlugO4fJU2qrluqIYfJJi2W5u0muP4h8gtgFo/4ypgFYUnOrR0OBOkyrHdOii4DAcBgTjMwPUfJVmmU9van7psaY/EfrzWeL4Z0nsXsga/WB/1EZPTDvZE3lwOGBoJb90nXnr7pfTOQ3+YeWpH4lerv0Hr7pb4DQ93arloe/BjBbMSHNcNemM+Swa4Jxo13EIwQASQc4EkToY8pkfZf8CoOICfKTwsedZnhJ4R0lD21UhtQ8uEN9eNh+4EJk+ELQ1qbVlnZhvdjAkznUDw75A9Ubse7bRY6oQCagPDJkiAQ52pGS44PJVwGYnGvoPD5nxwibueIMnpHSIxB5x5oqQengs7LoBjXnh+HOB1JOBjALR6RCSt2m59V74Ekgt1gEADAOnM/oLO1rjhb3Z4SZA/lJ4uGPAR7eCFtKnC8BoBMZdmM4P3Hl06IudiqFB20qjeyhxMu7uugwZgdS52v2RErGzKJNMvOruIAa5bwkkePeHj8kq2rWc6rwzhriBmQACM+pz6wm1tVhjCDDe83x+yCfd36hVylbLYoKs6jW97kGux1mAGnqMQqztLLnO0JI9BGB+uiPuLkNaOpAPlGP+4+yXVHF3LUT88fmgSTNDV4T1x8+f3r1Z/G2SM4HP018ArBsXdcVAHVXETyH4qba+7jWgBnXGp10n2KBOllOc2PXK1CMubUtJB1Bg/mEJGVBS0bkhpc8OGo5+H/ACrU7ZNJypu7tm50ZILpjxGk+4Vg/YrlmhlaMbuJizxqYRW3cB+F0JZc7Crt+Fx90X/6lcM+Jsrzd6Y+JhTlPIrNS7p6z96jutp1Hth4hWOlvFRdrjzQO3q9JzO7Hoo9DR3op1VXbdkfuz5D7lSqqu+7uKRS4tj5+1Hj8blOFAPjd5qdqcqOZhM21JpBvQfOSY8eaWI21cCOHnBHnzHsQfdZInTIPHmI/XmsVeXl+JXnDK2e0RI0+fl/ugEJFQcPC0HRmeh7xdEdSfkFCypgDxBP6/Wqjb+H+ykp0u6XdDw/5SfwPspZEgik468hA056x8vkiqzwamcd1seEQAY54goFrZBaBzn2nHzRNbZ1QFvFA4iMz9onp+sqWEP3jr0uGk1hBhkHzzMROMNAzOPFKmXHcIjwnmZ5fKT69U93h3aNvALi48QbocmSPw6pJUteEkAZIAnWJP38vIlSyNMgqajrEnl0P4qyWdCbcDn3j596B859kC/ZpDC+DoANdHA8IHnA9XALo2ztxbgW7XuAaeEGNDyOI0KFjqJQ6uzQQXOEnAHTqf14rOz9lcZFR8NZPPExGBzjy5DxVhFtxO4SMgwR481qd36t017Sx7CTw0y4hrAARBAEl085A1CK5I40DVdq0QeBh4ndAY8TGCtaG0w8wWkeBnUaagFMv/YDKJ7R9WX8msbwMb3Y6k9eY1Q9tu4OKKbSef8AuVOA/d5I3WFNzTImSXeRPTppKqO8OzOyIc0d04PgV0Cts99P4gk+37bjovEZiR5jIU2iuS5E9pWDHse34W913gNA7y0Vmo7ws0cCFWtgVWlvC6JAj0Vl2RZ0nsLHAS04PVpyPbI9E+F06KfVwuKl7B9PalF/MKOtZ29Tk1Q192qbvhMJTcbt1m5Y8/NaDnhtbdikdEk2xsg0W4MhTO/bKfU/NBbT2hUe2HiEJaHhdiOoVedgD90VRX6hXPYz/wB0hiHz6RO34neaIaENQ5+aJanKjmRELakcjzRe0rQMiMygliOoyYun9e627PlnwUVMwrTudurUv6jhTeGhjQ5ziJycNaBOTg+yLIlZW6ZxHn+GPkj7KgXUe7k8b5HgKbSPmHKfa+w6ltWdSqtgtPkHNOjmnoUbsSgTTqMjIqU3DkTxNfT183tx5oMdLk9sGw4hWwSW58QcxHU979Qmlwyk19AR8AmpJgYeAOIR1bqcw4K77qbuH9nqGO85xnHjho6iIQl19Hj3FxcT3nDHKIyXRqZJwlTLFEqG9m3hXIZTBIHemAJDWkmMSQAHSdNTCUWdu+tkMJPc7okyCceQyNcZXZKu49uWMa+n2haMSOuvwwidn7lsbo3sx0HSZ64TOvAPllfst22vq2rHD4XBzmSDoZ7xGDEdeQXXnUwWxCWbK2KyieLV0a/kmzUBZO9HLNvWLbe94y0cFTUQInqrVZ0mOA0I5YwB4LG+2y+0ZIHebkKsbtbULH9k/lyOoUG2XF1gw/Ub7BZp2TRoB7Imk6Qs1XYQAVPeig3hOM5VBvaXdI8D81ed56vLqqfdN7qMSSRztzhTc0ASYzHUkn9eisVpQqPxTMODRMeuPmgLWg1ld7i2TmJ0BTXZV1+zAucD3jH4psfcJm/1Mw65u6WoJWrN6ntMPYU6p7wUXarZwt6n2T7LWci/cDoby0nDOEo3kuqbx3YTmvu5Rd8JjyVc23snsdDIQloeFWV9wyFctlD90FTj8QVx2d/DCGIfNpE1v+KLaELbBGNTlRQb93calSLvasmBoENCwnWkahdL+heoDUuacw4sY9vWGuh0f3wuaK2/RXe9ltO3kw15NM+PG0gD+9wqNWiQdSTO3b4bntu7bUmqwEscYJkZiRmDH3Kg7j7B7UuAdDmupujkWtcJx1Ba35rtfacLPGFzWrZOsrtt0P4Dnlr+gD9SegmT/THMKLVFnOzpNpbNaAANAieyB5KC3fKJBQQrMcELDG5W8rwRFPOWGFa1DKre+W2bijTb+y0m1KhcAQ4kNa2CSTEdANeaA0Y3wPNqRwyuZbY2R2tQuYeF4yCDnzjorka9c0mmqwNcRkNkifXRUm3tTb1qtVxLqlTRx0aNIjkB0UseMaLfu1tAvpMD/igT56EI+7qQFSLK7c3mnZ2pxNhyBKEu3asuSG60TK/qS4pbVCaIshZZ0KfE4ucAZ0jwBlOf2Si8RgoO12W2rxEnIP4LWpsF7fgeVphFJWc7Plk243wjF3uvSd8OEjut1Krc03pq/wDaafioRvC9p77CrDPbEpZeUup+aF2leVHjviCrVT3nokw7Hmkm810x/wAMT4JZaHg+dFZ+sFcrA/ugqg1suCuFpT/dtUxjZnolttEU1DUNFOHJyo5m4c1qUeyhIQdalBWI6hEp7O5dTqMqN+Jjmvb5tII+YUC8oA+uNn3jbq3p1mGW1GNeP6hJHoZCPu7ZtWmWEAgtgtPRcM+iLf8AbbRZ3LopFxNKodKbnHLXfyk5nkT007xTM5wQcoNFt2hXszuNDPs49BomTaiBv4Y8GY4sR46/dPsp6bsJQhfGvcaiBWQiCiYLWrbtcQS0EhY4lrVuQ0SUQU/BJWboku27OiT3gB46FB7V3kDJHFBVL2ntivVJ7KlUeesQ3znQ+6BsxeknLkc3ez6YJ4XpfVoub5dUiq09oNy5lJvQcRLp6dFYLAVW0f3vDxH7JkBForyY+hiiqZULwi7kCZCGeMKIpYNSbVEuYMT8wPyIUzdp1G/E0qwbGsiaDXNyDxH/ADEfgpKtn1atUdHJyu5sQt2ww64WHOo1NeE+yOutj03coSa43azLHQnKiC93eoP8PJVbbezW0j3TITC/sLum7ukkJHtKpUJ78goS0Ww3sCp/GFbqNU9m1VK3+MK2NPcb5KY9By7RPQOEVwCMoGkVNUa6MJysqUIa4bIRgGEHclYTqC97VpCmeoyFAGq6Fup9K11aURQcxtdjBDC5xa9o5N4gDIHLC57C2aoFOi0bx79Xd3Xp1nP4OycHU2MnhaRzP2jyk8p6rue4u8zL23bUbhw7tRv2X8x5cx4FfMpVh3J3nfYXAqDNN0Nqs6tnUfzDJHso0FS55PqFpW4KV7L2kytTbUpuDmOALSOYKOFRKOTEpNtixq1oaypwN+sYl39PL39k041mVBk6doQ2G7lGl3oc95+s9znmTzHEceQgI24Y0A6I57CUPU2YDkko2W/XkVK/tuJxcSg6oMRKtlxsdp5lJb+2awGEGxHJy5ZW6oQty6Gn5eaPqMylF/UkwNB96lils3J2kwW4puOWucPQni/7irK11N3RcXfeGmdYymFpvJUH1lphyjm5U1NnVamz2OQFxsXoqtZb3kapzbb2sOpTUyp17Ad5syoDjK5nveHipD2x4rsjdu0ncwuSb/XzaleG6BHmiRXJWrJs1ArVUgMb5KsbObNROLg5A6BPDRMmw2i9SXFzAQVJy9cVAAiIRG2EaIK4twixUPCEFXeVlOmgR9uFA6gFK9xQ7pQAZ7ILLaYUDitZUslE76YUXAscRWeJQh176FNpcVKtbE96mRUZ/Zfhw/vCf6l0xlxBg4K+f/oy2p2G0aJJhtQmk7+vDf8AMGL6GuLcPHjyKqlstg+Ddj1K0pKXPYeoRFDaAQTGocsKxWqBAi7CGubvBzA6nARATXF0IVfvGF6ju9s0m6HjPhp7/kkm0dtPdgd0eGvv/wAJW0MkzXa9y1g4G/FzPT/dV1xUtZyGJQuwinb38MkciD84/FIaV6QrNtGjxMc3qCPcYVDDyr4SpGXLC2WBl+eqIbtIwq4yqphWVykUPGNDtdwdgkIO5rFxkoOcqRzkyB0hmynQ+U7u6rYEawkFrVDR4qTt5ViZXONuxk2opbWoJJdolTbmFpUu5TCdLHP7MY9EDXokclZg0cwoqtNpC57mdZYyoli1qU1YalgCg61kQipJiOLQjNAqI0k6q0CBogyxMI0AmmvCmjezWxYiAFocTCHN+JpDm+bTI+YX1Pse7FajTqjR7GvH9QB/FfMIYu//AEY3XHs+h1aHMP8AQ4gfKEk0PBlmuLYOQD9nA6puAsOaqmi2ys3ux6gyx59yFXb2xqT3pPnP4ropCBvaLSMhBxGUjn3YxqgLoKzbRtCCYCQ3dNAZsUvah3eCNqUUO9qIrA6yo+1rbgquHI94eR/Iq81gku2LPtG4+IZH4j1VsSqZVQtgVksWQ1XJFDZlpW7isNblG2Oy6tY9xuObjge6tSEbQGCvAphf7Fq0hJEjqOXmEvT0C0zPEscSwsEoho7hc7HY76qVXG7g5Eq4MbImFDUgEThc5ys3RTRRa+xqjdMoN9i/m0rozqbT0QdxYBKpIZxZzy4pRyQtOwa7VXO/2VOir9zYuYZARteGK4P2Ft1sGBLT6FKalBzdQn52gRhwKifWY5GMmtiyimJWMXYfocrTbVGfZqk+jmtP3grmzLVpXRvono8HbjqaZ/1BO5WqEUadnSGrJCwxbFIORFD1mSiHqGoVACu6tAdUlutmhx6KyVkPToZlLQ1lSvtjluUhuKELot+0AKqXVnxuwoiWVO4ppbWCt15sotEx6qvXVsSYAyrIoSRW76za4zoev5pd+wvkAAknAAyT6LpWx/o8uq8OeOxpnm/4iPBmvvCvGy9yLe3Hdy7m85cfyHgFojxszzfscn2HuU4w+vjoz/yP4BXmx2PIDWtAA6CBCtjtm02Audho5uVY3l2xVaOzpU30aWJrGm54eObf3R46Q/mLZ6AYKvT9jNK3sBvrK34nUg5tSqB3m8QAb5xn0+5U7bO67AZa7h8AO76CZUtw/ibEcTBgfBeUx4zDazD5yk9xdlohryPAPLh5cFXvDylWfkVJrQpu7MsOoKCKJurguOUKklXg0wuuT6LsrkcIWL2CEtpGAI6KO9uSAFzJLg3xuyd1Pop8wl9K/HNMGXrYCoSoubBLmoQg3lrtQmFz3ggXUFTN8lsRbcbLY7RKbvd8/VVmFMhSghCM5LQZQiyjN2bVDg1oJJIAHMk6LrG4u71e1DzXgF/DABmOHi1xE97lK03N2SKtcVC0FtPP9X1fzXR+Fb8dyjbMGVqMqQratpRrrZvSPJaG0HU/JNQnWgJxULgmJsx1K0Nn4odLJ1IWOasNYmf7COp+SkbatHL3R6QdaK1fsJ0EnoEHZbGquM9mWjq7HyOVdmsA0C8VOkDmxA3d4H43eg/Mou02RQomWUmh32ol3945RtxVIHdYXHpIaPUn8JS2vbXNTWsKI6Umhz/8SoI/yKyKKpSZPf3tOk0vqvbTaPrOIaPmqxR32tKryyjVBIxxODw0/wBkRnzwmY3RteLjqMNZ/wBus51Uz4cRgeQAR7KFOmIYxrR0aAB7BWLpK31P4EdesyeJ3HUdyPA8geUDhHmle0dovE8NvVd/ht/1PCs9zVGVXNrXoAVsCqfBz/eCq9x4jZMn7TnU+L3bn5qkbRrunLY/qLvvKu28m0xkLn15W4iVdLhAxcsHcVheKwqWzWd4mEp2jdd6AjKhJSqqzJlc3I3XB0MarZEwlxCZUqRbklDWpAd+uS9f3c4CpSUVbLW7dG7tp5hG29+DqkdNiebE3cr3BljSGTl5wPSdT5JI3Jhl0xVsNa9pTKw3cqVoIgN6kppR2FRtGdpWeGga1HnPk0Dn4DKT7V+k5jBw2lLiA+vUkDzDdT6kLbi9HfOzm5vXqHF1/ZeLK2o2dElzgxgEucTA9Z5qv230mWbnlrhUaJw/hkEdYGR7KiVbfam0yHOZUezVsxTpN8WzAPnkqx7H+ivQ3NbzZS/83D7mrb9LHFfe+fg53182R/41x8l3s96LOqQGXDCToJhx9DlNku2RsK3thFGk1p5u1cfNxyj6tVrRxOcGtGpJAA9Ss0qv7TZHqr7qNlhAP2wyJYHVBrLRDI69q+GfNLq22qjgS0N4Rzp/vYHU1XllJpHTicoosjmkPlglVQX1R4kVHvac8TXOLY/t0KLWD/EKXvrAO/ivkRj9pdOeWb8dOYCdQEeUvUeK0rPa0S4ho6kgD3KpNSvpNSoPO6rA58KdZ5CDqW7SZ4KTiMjjo1rmp6Or1Q1pR+mK8vwWmvvXaNkNq9q4fVotdWd7UwYQlXeWoRNKwuXY1eKVEevaPBHskF3eua3v1qrG8g66sbNnkBRLne6WPt6bgXFlo/o6pWvb13sGgOHgDCdY0I8kmO77ey4brTs6X/VvGz7MaUiuN9a2ZutnN6cLq9UknwAC1p0HY7JtJnjS2RXj+9VhR1WXWjTea/Ut7KgPd7p91YooFsW3O8lZ4xeNP/Ss6rp9XFINq7TrO/8AluXePYNpj5p5f2t0fiN2fB9zRYP/AMmnKqW2KDhPED/VXqP/AACsSF/Il2hcuJy5/wDUR+CWkqWu7KhVcmaYKkeWF5YSNjneHaFJa2p8wvLywZNG+ANTOfder6rK8sz0XrYVshoNVgIBBc2Qcg55ruNFgAAAAAEADAA6ALy8tHp9My+q2jjv0sV3G8DS4loptIbJgEzJA0BRH0T2tN9w4vY1xayRxNBg9ROhWV5df/ged/k/s6+sheXlzzsEdwYa7yKq+7x7SlWqP79RpcGvd3nNEnDXHI9F5eTR0ymfcv2DbmDt+0dW/eua53C6p3y3J+EumPRabuONW4u+1/edm49nx97s+4Pg4vh9F5eVkvJStRN90WivVqmuO14HdztO/wAP9nimPRXAiMDA8F5eS5Nl2HtRFUQzrZh1Y0+YBXl5CIzPNoMb8LWjyAH3LSo49VheTeQeAW4OqUXrjGqyvKyJXMqG13HvZXOdvuOV5eWlaM/kq71oV5eWdm88sLy8kCf/2Q=="
      },
      {
        username: "kth0904",
        comment: "정말 감사합니다. 보험설계 너무 친절해요!!!.",
        start: 5,
        uri:
          "http://file2.instiz.net/data/file/20150402/c/a/3/ca3af4d6bc638ed6dc480512626dd498.jpg"
      },
      {
        username: "kjs0629",
        comment: "감동먹었어요. 다음에 또 잘 부탁드릴게요",
        start: 4,
        uri:
          "http://mblogthumb1.phinf.naver.net/MjAxNzA0MTBfOTkg/MDAxNDkxNzU4ODg1OTk1.nU1pHWwcRQJTDAW8n0PXT5ZpnzNmsY8q7Q2sU9Oz3gUg.q32BKdoiXaYqFjw0eIXnueRVuvadNpmA-jcdIHsZS4Eg.JPEG.jessi00812/1.jpg?type=w800"
      },
      {
        username: "sdfnosv121",
        comment: "덕분에 보험료를 줄일 수 있어서 너무 감사합니다.",
        start: 2,
        uri: "https://t1.daumcdn.net/cfile/tistory/2549224B5848BC4F0C"
      },
      {
        username: "sdfo12138",
        comment: "이번년도 목표는 이미 이루었습니다. 장난한번봐요",
        start: 3,
        uri: "https://fimg2.pann.com/new/download.jsp?FileID=24714962"
      },
      {
        username: "yej0424",
        comment: "진짜 똑똑하시고 알기 쉽게 설명해주셨어요",
        start: 2,
        uri:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNlxFQC8vg1w3xit2zNNC-AqEiWOc_UFEWyvXPI_s50S22EbuTyw"
      }
    ],
    DetailPlannerInfo: {  //정적 데이터
      id: 1,
      name: "권태희",
      startDay: "18.09.04", //설계사 등록일
      clientNum: 80,
      team: "KALON",
      averageEstimation: 4, //별점
      uri: "http://img.hankyung.com/photo/201808/01.17511742.1.jpg",
      smartRecommedPoint: 10,
      comment: "미모가 보험 설계의 전부."
    },
    SearchingIndex: "",
    UserStockImage: [],
    count: 1,
    InsuranceInfo: {
      id: 1111,
      guaranteeContents: [
        {
          guranteeName: "무배당 가족보험",
          detailPrice: 1200,
          detailContent: "사랑, 질병"
        },
        {
          guranteeName: "무배당 연인보험",
          detailPrice: 2120,
          detailContent: "이별, 100일 보장"
        },
        {
          guranteeName: "무배당 친구보험",
          detailPrice: 120,
          detailContent: "절교, 축의금"
        },
        {
          guranteeName: "배당 비트코인 보험",
          detailPrice: 2000,
          detailContent: "50% 하락시 보장"
        },
        {
          guranteeName: "배당 하이퍼렛저 보험",
          detailPrice: 4200,
          detailContent: "어려움, 배워도 모르겠음, 보장못함"
        }
      ]
    },
    UserInfo: {
      id: "kjs0629",
      name: "김정수",
      age: 30,
      sex: "남자",
      email: "jungsubabo@naver.com",
      phonenumber: "010-4383-8890",
      image:
        "https://scontent-lht6-1.cdninstagram.com/vp/00a46baced30a956b68580df4515a584/5CEECADF/t51.2885-15/e35/25025824_184633442119937_7061717784211750912_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&se=8&ig_cache_key=MTY3NDQ0NTc0NjU3MjQ0MzEwOQ%3D%3D.2"
    },
    PlannerInfo: [

    ],

    UserInsuranceInfo: [
    
    ],
    RequestForISM: [

    ]
  },
  action
) => {
  switch (action.type) {
    case "ADD_USER_IMAGE":
      return {
        ...state,
        UserInfo: {
          ...state.UserInfo,
          image: action.image
        }
      };
    case "ADD_SEARCH_INDEX":
      return {
        ...state,
        SearchingIndex: action.SearchingIndex
      };
    case "ADD_PLANNER_DETAIL":
      return {
        ...state,
        DetailPlannerInfo: action.item
      };
    case "ADD_CHOICEINSURANCE":
      return {
        ...state,
        ChoiceInsurance: action.ChoiceInsurance
      };
    case "ADD_PlannerInfo":
      return {
        ...state,
        PlannerInfo: action.PlannerInfo.map(item => item.Record)
      }; 
    case "ADD_UserInsuranceInfo":
      return {
        ...state,
        UserInsuranceInfo: state.UserInsuranceInfo.concat(action.UserInsuranceInfo.map(item => item.Record))
      };
    case "ADD_RequestForISM":
      return {
        ...state,
        RequestForISM: state.RequestForISM.concat(action.RequestForISM.map(item => item.Record))
      };
      case "init_RequestForISM":
      return {
        ...state,
        RequestForISM: []
      };
      case "ADD_CoinInfo":
      return {
        ...state,
        CoinInfo: action.CoinInfo.map(item => item.Record)
      }; 
      case "ADD_Coin":
      return {
        ...state,
        coin : state.coin + action.coin
      }; 
      case "ADD_ClaimIndex":
      return {
        ...state,
        claimIndex : state.claimIndex + 1
      }; 

    
      // case "ADD_RequestForISM":
      // return {
      //   ...state,
      //   RequestForISM: action.RequestForISM.map(item => item.Record)
      // };                   
  }

  return state;
};

export default reducer;
