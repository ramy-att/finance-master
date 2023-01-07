import Image from "next/image";
import { Accordion } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import c1 from "../pictures/1.png";
import c2 from "../pictures/2.png";
import { LandingPageE1 } from "./LandingPageE1";
import { LandingPageE2 } from "./LandingPageE2";
import { LandingPageE3 } from "./LandingPageE3";

export default function LogInPage() {
  return (
    <Container classname="HomePage" fluid>
      <Row>
        <div className="carouselRow">
          <Carousel controls={false} indicators={false} className="homeCarousel">
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={c1}
                alt="First slide"
                width="1000px"
                height="600px"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={c2}
                alt="Second slide"
                width="1000px"
                height="600px"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </Row>
      <div className="LandingPageElements">
        <Row>
          <Col md={4}>
            <LandingPageE1 />
          </Col>
          <Col md={4}>
            <LandingPageE2 />
          </Col>
          <Col md={4}>
            <LandingPageE3 />
          </Col>
        </Row>
        <Row>
          <Accordion className="Accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>50 30 20 Budget Rule</Accordion.Header>
              <Accordion.Body>
                The 50/30/20 budgeting rule by US Senator Elizabeth Warren
                divides your after-tax income into three categories: 50% for
                needs, 30% for wants, and 20% for savings. Your “needs” include
                obligatory expenses like rent or mortgage payments. Your “wants”
                are your basic pleasures of life. You should allocate the last
                20% towards setting up an emergency fund, or paying down any
                high-interest debt. To begin with the 50/30/20 budget, calculate
                your after-tax income on average. Then take a look at your
                spending habits to categorize your expenditures. Next, identify
                easy, low-hanging opportunities to save. Remember that the
                50/30/20 number is a guideline, and you can (and should) tweak
                them according to your own financial goals.
                <a href="https://www.koho.ca/learn/what-is-the-fifty-thirty-twenty-budgeting-rule/">
                  Source
                </a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Types of Investments in Canada
              </Accordion.Header>
              <Accordion.Body>
                <h1>Annuity</h1>
                <p>
                  An annuity is a type of investment contract that pays you
                  income at regular intervals, usually after retirement.
                </p>
                <h1>Bond</h1>
                <p>
                  A bond is a certificate you receive for a loan you make to a
                  company or government (an issuer). In return, the issuer of
                  the bond promises to pay you interest at a set rate and to
                  repay the loan on a set date.
                </p>
                <h1>Canada Savings Bond (CSB)</h1>
                <p>
                  A Canada Savings Bond is a savings product issued and
                  guaranteed by the federal government. It offers a minimum
                  guaranteed interest rate. Canada Savings Bonds have a
                  three-year term to maturity, with interest rates remaining in
                  effect for that period. At the end of the period, the Minister
                  of Finance announces the new rates based on prevailing market
                  conditions. It may be cashed at any time and earns interest up
                  to the date it is cashed. Canada Savings Bonds are only
                  available through the Payroll Savings Program, which allows
                  Canadians to purchase bonds through payroll deductions.
                </p>
                <h1>Exchange traded fund (ETF)</h1>
                <p>
                  An exchange traded fund is an investment fund that holds
                  assets such as stocks, commodities or bonds. Exchange traded
                  funds trade on stock exchanges and have a value that is
                  similar to the total value of the assets they contain. This
                  means that the value of an exchange traded fund can change
                  throughout the day. The risk level of an exchange traded fund
                  depends on the assets it contains. If it contains high-risk
                  assets, like some stocks, then the risk level will be high.
                </p>
                <h1>GIC</h1>
                <p>
                  A GIC is an investment that protects your invested capital.
                  You will not lose money on the investment. GICs can have
                  either a fixed or a variable interest rate.
                </p>
                <h1>Mutual Funds</h1>
                <p>
                  A mutual fund is a type of investment in which the money of
                  many investors is pooled together to buy a portfolio of
                  different securities. A professional manages the fund. They
                  invest the money in stocks, bonds, options, money market
                  instruments or other securities.
                </p>
                <h1>Security</h1>
                <p>
                  A security is a transferable certificate of ownership of an
                  investment product such as a note, bond, stock, futures
                  contract or option.
                </p>
                <h1>Segregated fund</h1>
                <p>
                  A pooled investment fund, much like a mutual fund, is set up
                  by an insurance company and segregated from the general
                  capital of the company. The main difference between a
                  segregated fund and a mutual fund is the guarantee that,
                  regardless of fund performance, at least a minimum percentage
                  of the investor’s payments into the fund will be returned when
                  the fund matures.
                </p>
                <h1>Stock</h1>
                <p>
                  A stock is a unit of ownership in a company which is bought
                  and sold on a stock exchange. Stocks are also called “shares”
                  or “equities”.
                </p>
                <h1>Treasury bill (T-bill)</h1>
                <p>
                  A T-bill is a short-term, low-risk investment issued by a
                  federal or provincial government. It is sold in amounts
                  ranging from $1,000 to $1 million, and must be held for a
                  fixed term which can range from one month to a year.
                </p>
                <a href="https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/investing-basics.html#toc0">
                  Source
                </a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Important Investment Terms</Accordion.Header>
              <Accordion.Body>
                <h1>Risk</h1>
                <p>
                  Risk is the potential of losing your money when investing, or
                  the level of uncertainty regarding what you will earn or lose
                  on your investment. Almost every type of investment involves
                  some risk. Generally, the higher the potential return, the
                  higher the risk.
                </p>
                <h1>Return</h1>
                <p>
                  Return on your investment, also known as ROI, is the profit or
                  growth that you make on an investment. It can vary greatly.
                  For some investments, it can&apos;t be predicted with certainty. An
                  investment&apos;s return can come in two forms: Income, including
                  interest or dividends. A dividend is a portion of a company&apos;s
                  profit that is paid to its shareholders Increased value, also
                  called “capital gain,” which lets you sell your investment for
                  a profit You can also have a negative return if your
                  investment loses value. This is also called a “capital loss.”
                </p>
                <h1>Risk Tolerance</h1>
                <p>
                  Risk tolerance is how comfortable you are with risk and not
                  knowing what you will earn or lose on your investment. If you
                  prefer little or no risk, you have a low risk tolerance, or
                  are &apos;risk averse.&apos; You have a high risk tolerance if you are
                  willing to risk losing some or all of your investment in
                  exchange for the potential to earn more money. You can ask
                  yourself the following questions to help determine your risk
                  tolerance: 1) When will you need the money. 2) Do you have
                  enough money set aside for an emergency and to cover debts. 3)
                  Is your job stable. 4) Can you tolerate investments where
                  returns may be unpredictable or subject to sudden changes in
                  value. 4) How would you react if your investments declined in
                  value
                </p>
                <h1>Liquidity</h1>
                <p>
                  Liquid assets or investments are those you are able to cash in
                  or sell quickly. Examples of liquid assets include savings
                  accounts and most stocks. A house is considered a non-liquid
                  asset. Liquidity can be important if you are planning to use
                  your savings or investments in the short term.
                </p>
                <h1>Diversification</h1>
                <p>
                  Having a mix of investments in different asset classes is
                  called diversification. This can help you to reduce risk.
                  There are two ways to diversify your investments: portfolio
                  diversification and asset allocation.
                  <p>
                    Portfolio diversification: Means having a mix of investments
                    to reduce risk. For example, having investments in many
                    companies instead of just one. When you hold a variety of
                    investments, you reduce the possibility that all of them
                    will lose value at the same time. If you only own one stock
                    and that company loses value, then you risk losing all of
                    the money you invested.
                  </p>
                  <p>
                    Asset allocation: Means having different types of asset
                    classes in your investment portfolio, for example: stocks,
                    bonds and cash. When you have different types of assets, you
                    reduce the risk that all assets will lose value at the same
                    time.
                  </p>
                </p>
                <a href="https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/investing-basics.html#toc0">
                  Source
                </a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What is Inflation</Accordion.Header>
              <Accordion.Body>
                <h1>What is it?</h1>
                <p>
                  Inflation is a rise in prices, which can be translated as the
                  decline of purchasing power over time. The rate at which
                  purchasing power drops can be reflected in the average price
                  increase of a basket of selected goods and services over some
                  period of time. The rise in prices, which is often expressed
                  as a percentage, means that a unit of currency effectively
                  buys less than it did in prior periods. Inflation can be
                  contrasted with deflation, which occurs when prices decline
                  and purchasing power increases.
                </p>
                <p>
                  Inflation aims to measure the overall impact of price changes
                  for a diversified set of products and services. It allows for
                  a single value representation of the increase in the price
                  level of goods and services in an economy over a period of
                  time.
                </p>
                <p>
                  To combat this, the monetary authority (in most cases, the
                  central bank) takes the necessary steps to manage the money
                  supply and credit to keep inflation within permissible limits
                  and keep the economy running smoothly.
                </p>
                <p>
                  Some advice: invest according to your risk tolerance to reduce
                  the impact of inflation
                </p>
                <a href="https://www.investopedia.com/terms/i/inflation.asp">
                  Read More...
                </a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                Why Should I Create a Financier Account
              </Accordion.Header>
              <Accordion.Body>
                <h1>A Free Financier Account Allows You To:</h1>
                <ol>
                  <li>Setup a budget</li>
                  <li>Track your bank accounts</li>
                  <li>Track income streams</li>
                  <li>Track expenses</li>
                  <li>Track investments</li>
                  <li>Track your bank accounts</li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </div>
    </Container>
  );
}
