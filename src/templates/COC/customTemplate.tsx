import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { CertificateOfCompetency, Capacity, JobFunction } from "../sample";
import { get } from "lodash";
import { format } from "date-fns";

const Header = () => (
  <>
    <div className="text-center m-4">
      <img
        style={{ width: 100 }}
        src="https://upload.wikimedia.org/wikipedia/en/0/0f/Maritime_and_Port_Authority_of_Singapore_%28logo%29.png"
      ></img>
    </div>
    <div className="m-4">
      <div className="text-center" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
        Maritime and Port Authority of Singapore
      </div>
      <div className="text-center">Merchant Shipping Act (Chapter 179)</div>
      <div className="text-center">Merchant Shipping (Training, Certification and Manning) Regulations</div>
    </div>
  </>
);

const renderCapacity = (capacities?: Capacity[]) => {
  if (!capacities) return null;
  const renderedRows = capacities.map((capacity, index) => (
    <tr key={index}>
      <td style={{ border: "1px solid black" }}>{capacity.title}</td>
      <td style={{ border: "1px solid black" }}>{capacity.limitations || "None"}</td>
    </tr>
  ));
  return (
    <table className="text-center w-100 m-4">
      <thead>
        <tr>
          <th style={{ border: "1px solid black" }}>CAPACITY</th>
          <th style={{ border: "1px solid black" }}>LIMITATIONS</th>
        </tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
};

const renderJobFunctions = (functions?: JobFunction[]) => {
  if (!functions) return null;
  const renderedRows = functions.map((fn, index) => (
    <tr key={index}>
      <td style={{ border: "1px solid black" }}>
        <span dangerouslySetInnerHTML={{ __html: fn.title || "" }} /> {fn.level}
      </td>
      <td style={{ border: "1px solid black" }}>{fn.limitations || "None"}</td>
    </tr>
  ));
  return (
    <table className="text-center w-100 m-4">
      <thead>
        <tr>
          <th style={{ border: "1px solid black" }}>FUNCTION and LEVEL</th>
          <th style={{ border: "1px solid black" }}>LIMITATIONS</th>
        </tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
};

export const CustomTemplate: FunctionComponent<TemplateProps<CertificateOfCompetency>> = ({ document }) => {
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-6">
          <div className="text-center" style={{ fontWeight: "bold" }}>
            <div>Certificate of Competency</div>
            <div>{get(document, "type.title")}</div>
            <div>{get(document, "type.class")}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center" style={{ fontWeight: "bold" }}>
            <div>Certificate No.</div>
            <div>{document.id}</div>
          </div>
        </div>
      </div>

      <div className="text-center m-4">
        <div>This is to certify that</div>
        <div className="m-2" style={{ fontWeight: "bold" }}>
          {get(document, "recipient.name")}
        </div>
        <div className="text-left">has been found duly qualified to hold this Certificate of Competency</div>
        <div className="m-2" style={{ fontWeight: "bold" }}>{`(${get(document, "type.title", "").toUpperCase()}) ${get(
          document,
          "type.class",
          ""
        ).toUpperCase()}`}</div>
        <div className="text-left">
          and is entitled under the Merchant Shipping Act (Cap 179) to serve in a merchant ship in any capacity
          requiring a certificate of competency of that class save that the holder must have additional training and
          service, where such is a requirement in accordance with the above Regulations.
        </div>
      </div>

      <div className="row m-4">
        <div className="col-6 d-flex flex-column-reverse">
          <div className="m-4">
            Date of Issue:{" "}
            <span style={{ fontWeight: "bold" }}>
              {document.issuanceDate && format(new Date(document.issuanceDate), "dd MMM yyyy")}
            </span>
          </div>
        </div>
        <div className="col-6 text-center align-bottom">
          <div>
            <img style={{ width: "50%" }} src={get(document, "signatory.signature")}></img>
          </div>
          <div style={{ fontWeight: "bold" }}>{get(document, "signatory.name")}</div>
          <hr />
          <div>{get(document, "signatory.position")}</div>
          <div>Maritime and Port Authority of Singapore</div>
        </div>
      </div>

      <hr />

      <div className="m-2" style={{ fontWeight: "bold", textTransform: "uppercase" }}>
        Endorsement attesting the issue of a certificate under the provisions of the international converntion on
        standards of training, certification and watchkeeping for seafarers, 1978, as amended.
      </div>
      <div className="m-2">The Government of Singapore certifies that the present certificate has been issued to</div>
      <div className="m-2 text-center" style={{ fontWeight: "bold" }}>
        {get(document, "recipient.name")}
      </div>
      <div className="m-2">
        who has been found duly qualified in accordance with the provisions of regulation(s) II/2 of the above
        Convention, as amended, and has been found competent to perform the following functions, at the levels
        specified, subjest to any limitations indicated until{" "}
        <span style={{ fontWeight: "bold" }}>
          {document.expiryDate && format(new Date(document.expiryDate), "dd MMM yyyy")}
        </span>{" "}
        or until the date of expiry of any extension of the validity of this endorsement issued by the Maritime and Port
        Authority of Singapore.
      </div>

      <div className="m-2">{renderJobFunctions(document.functions)}</div>

      <div className="m-2">
        The lawful holder of this endorsement may serve in the following capacity or capacities specified in the
        applicable safe manning requirement of the administration:
      </div>

      <div className="m-2">{renderCapacity(document.capacities)}</div>

      <div className="row m-4">
        <div className="col-6 d-flex flex-column-reverse">
          <div>
            <div className="m-2">
              Endorsement No.: <span style={{ fontWeight: "bold" }}>{document.id}</span>
            </div>
            <div className="m-2">
              Date of Issue:{" "}
              <span style={{ fontWeight: "bold" }}>
                {document.issuanceDate && format(new Date(document.issuanceDate), "dd MMM yyyy")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-6 text-center align-bottom">
          <div>
            <img style={{ width: "50%" }} src={get(document, "endorsement.signature")}></img>
          </div>
          <div style={{ fontWeight: "bold" }}>{get(document, "endorsement.name")}</div>
          <hr />
          <div>{get(document, "endorsement.position")}</div>
          <div>Maritime and Port Authority of Singapore</div>
        </div>
      </div>

      <hr />

      <div className="text-center m-4" style={{ fontWeight: "bold" }}>
        Particulars of Holder
      </div>
      <div className="row">
        <div className="col-4">
          <img
            style={{ width: "100%", borderWidth: 2, borderColor: "black", borderStyle: "solid" }}
            src={get(document, "recipient.photo")}
          ></img>
        </div>
        <div className="col-8" style={{ fontWeight: "bold" }}>
          <div>Country of Birth</div>
          <div>{get(document, "recipient.countryOfBirth")}</div>
          <div className="mt-2">Date of Birth</div>
          <div>
            {get(document, "recipient.dateOfBirth") &&
              format(new Date(get(document, "recipient.dateOfBirth")), "dd MMM yyyy")}
          </div>
          <div className="mt-2">Qualifying Conditions Met on</div>
          <div>{document.issuanceDate && format(new Date(document.issuanceDate), "dd MMM yyyy")}</div>

          <div className="mt-4 text-center">
            <img style={{ width: "25%" }} src={get(document, "signatory.signature")}></img>
            <hr />
            <div>Signature of Holder</div>
          </div>
        </div>
        <div className="m-4">This certificate in its original form must be kept on board while serving on a ship.</div>
      </div>
    </div>
  );
};
